import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
    text-transform: uppercase;
  }

  tbody td {
    padding: 12;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
    object-fit: cover;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
    display: block;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      text-align: center;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;
