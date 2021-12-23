import React, {useContext} from 'react';
import AppContext from '../../AppContext.js';

export default function Carousel() {
  return (
    <div className="carousel">
      This is the carousel
      <div className="carousel-row">
        <div className="carousel-left">
          This is carousel left
        </div>
        <div className="carousel-middle">
          This is carousel middle
        </div>
        <div className="carousel-right">
          This is carousel right
        </div>
      </div>
    </div>
  );
}