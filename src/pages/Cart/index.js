import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import ProductTable from '../../components/ProductTable';
import { Container, Total } from './styles';

function Cart({ cart, total, removeFromCart, updateAmount }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      {cart.length > 0 ? (
        <>
          <ProductTable
            cart={cart}
            increment={increment}
            decrement={decrement}
            removeFromCart={removeFromCart}
          />

          <footer>
            <button type="button">Finalizar pedido</button>
            <Total>
              <span>Total</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      ) : (
        <h4>Não há produtos no carrinho...</h4>
      )}
    </Container>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
