import React from 'react';
import CartaComponent from './CartaComponent';

function ManoComponent({ cartas }) {
  return (
    <div>
      {cartas.map((carta, index) => (
        <CartaComponent key={index} name={carta.name} value={carta.value} />
      ))}
    </div>
  );
}

export default ManoComponent;
