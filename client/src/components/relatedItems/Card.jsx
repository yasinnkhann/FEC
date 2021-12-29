import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import ProductInfo from './ProductInfo.jsx';
import ProductPreviewImages from './ProductPreviewImages.jsx';

export default function CarouselCard({ product }) {
  const setSelectedProduct = () => {
    console.log('clicked');
  };

  return (
    <div className="carousel-card" style={{border: '1px solid black'}} onClick={() => setSelectedProduct(product)} >
      <ProductPreviewImages />
      <ProductInfo product={product} />
    </div>
  );
}