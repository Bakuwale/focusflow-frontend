import React from 'react';
import { card } from './Card.styles';

const Card = ({ children, style = {}, onClick, ...props }) => {
  return (
    <div
      style={{ ...card, ...style }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
