import React from 'react';

function CartaComponent({ name, value }) {
  return (
    <img
      src={`./assets/${name}`}
      alt={name}
      style={{ width: '100px', height: '150px' }}
    />
  );
}

export default CartaComponent;

