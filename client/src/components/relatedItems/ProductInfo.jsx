import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContext.js';

const ProductInfo = ({ product }) => {
  const {products, setProducts} = useContext(AppContext);

  return (
    <div>
      <h3>{product.name}</h3>
      <h4>{product.default_price}</h4>
      <h4>{product.category}</h4>
    </div>
  );
};

export default ProductInfo;


