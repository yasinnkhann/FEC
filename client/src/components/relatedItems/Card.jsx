import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import ProductInfo from './ProductInfo.jsx';

export default function CarouselCard({ product }) {

  // CONTEXT
  const {selectedProductValue} = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = selectedProductValue;

  return (
    <div className="carousel-card" style={{border: '1px solid black'}} onClick={() => setSelectedProduct(product)} >
      <img alt="product image" />
      <ProductInfo product={product} />
    </div>
  );
}