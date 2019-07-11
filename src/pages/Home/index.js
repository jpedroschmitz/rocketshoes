import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import ProductItem from '../../components/ProductItem';

export default function Home() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

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
    dispatch(CartActions.addToCartRequest(id));
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
};
