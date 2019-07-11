import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExits = yield select(state => state.cart.find(p => p.id === id));

  if (productExits) {
    const amount = productExits.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    console.tron.log('chegou');
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
