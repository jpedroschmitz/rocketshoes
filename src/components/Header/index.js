import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Cart, ShoppingIcon } from './styles';

function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img
          src="https://app.rocketseat.com.br/api/files/1562597403849.svg"
          alt="Rocketshoes"
        />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <ShoppingIcon />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
