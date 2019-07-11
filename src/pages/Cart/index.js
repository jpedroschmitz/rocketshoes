import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import ProductTable from '../../components/ProductTable';
import { Container, Total } from './styles';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((auxTotal, product) => {
        return auxTotal + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function handleRemoveFromCart(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  return (
    <Container>
      {cart.length > 0 ? (
        <>
          <ProductTable
            cart={cart}
            increment={increment}
            decrement={decrement}
            removeFromCart={handleRemoveFromCart}
          />

          <footer>
            <button type="button">Proceed to payment</button>
            <Total>
              <span>Total</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      ) : (
        <h4>No products in the cart...</h4>
      )}
    </Container>
  );
}
