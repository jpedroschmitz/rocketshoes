import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import ProductItem from '../../components/ProductItem';

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  const handleAddToCart = id => {
    addToCartRequest(id);
  };

  return (
    <ProductList>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          amount={amount}
        />
      ))}
    </ProductList>
  );
}

Home.propTypes = {
  amount: PropTypes.shape({}).isRequired,
  addToCartRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
