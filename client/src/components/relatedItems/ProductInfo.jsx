// Dependency imports
import React, { useContext, useState, useEffect } from 'react';

// Context imports
import AppContext from '../../AppContext.js';

// PRODUCT INFO
export default function ProductInfo({ product }) {
  // CONTEXT
  const {products, setProducts} = useContext(AppContext);

  // STATE
  const [price, setPrice] = useState(product.default_price);

  return (
    <div>
      { product !== null ?
        <div>
          <h3>{product.name}</h3>
          <h4>{product.default_price}</h4>
          <h4>{product.category}</h4>
          <h4>star rating</h4>
        </div>
        : <h3>This will be an outfit</h3>
      }
    </div>
  );
}


