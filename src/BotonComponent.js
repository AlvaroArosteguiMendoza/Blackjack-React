import React from 'react';

function BotonComponent({ onClick, texto }) {
  return <button onClick={onClick}>{texto}</button>;
}

export default BotonComponent;
