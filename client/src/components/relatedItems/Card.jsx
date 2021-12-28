import React, { useState, useContext } from 'react';
import AppContext from '../../AppContext.js';
import ProductInfo from './ProductInfo.jsx';

export default function CarouselCard({ product }) {

  // CONTEXT
  const {selectedProduct, setSelectedProduct} = useContext(AppContext);

  // LOGS
  // console.log('PRODUCT::', product);
  // console.log('CONTEXT SELECTEDPRODUCT::', selectedProduct);
  // console.log('STATE NEWSELECTEDPRODUCT::', newSelectedProduct);

  return (
    <div className="carousel-card" style={{border: '1px solid black'}} onClick={() => setSelectedProduct(product)} >
      <img alt="product image" />
      <ProductInfo product={product} />
    </div>
  );
}