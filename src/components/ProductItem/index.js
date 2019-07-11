import React from 'react';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';
import { Item } from './styles';

export default function ProductItem({ product, amount, handleAddToCart }) {
  return (
    <Item>
      <img src={product.image} alt={product.title} />
      <strong>{product.title}</strong>
      <span>{product.priceFormatted}</span>
      <button type="button" onClick={() => handleAddToCart(product.id)}>
        <div>
          <MdAddShoppingCart size={16} color="#FFF" /> {amount[product.id] || 0}
        </div>
        <span>ADD TO CART</span>
      </button>
    </Item>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priceFormatted: PropTypes.string.isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  amount: PropTypes.shape({}).isRequired,
};
