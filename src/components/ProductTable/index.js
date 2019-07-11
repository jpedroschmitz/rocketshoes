import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import { Table } from './styles';

export default function ProductTable({
  cart,
  removeFromCart,
  increment,
  decrement,
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Produto</th>
          <th>Qtd</th>
          <th>Subtotal</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {cart.map(product => (
          <tr>
            <td>
              <img src={product.image} alt={product.title} />
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>
            <td>
              <div>
                <button type="button" onClick={() => decrement(product)}>
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button" onClick={() => increment(product)}>
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subTotal}</strong>
            </td>
            <td>
              <button type="button" onClick={() => removeFromCart(product.id)}>
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

ProductTable.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};
