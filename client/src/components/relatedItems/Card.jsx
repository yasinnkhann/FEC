import React, { useContext } from 'react';
import AppContext from '../../AppContext.js';
import ProductInfo from './ProductInfo.jsx';

export default function CarouselCard({ product }) {

  return (
    <div className="carousel-card" style={{border: '1px solid black'}} >
      <img alt="product image" />
      <ProductInfo product={product} />
    </div>
  );
}