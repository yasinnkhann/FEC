import React, { useState, useEffect, useContext } from 'react';
import { TOKEN } from '../../config.js';
import axios from 'axios';
import AppContext from '../../AppContext.js';

export default function Overview() {
  const { products, setProducts } = useContext(AppContext);
  const selectedProduct = products.slice(0, 1)
  console.log('product : ', selectedProduct)
    return (
      <div className="product-overview">
        <div className="product-title">{selectedProduct[0]?.name}</div>
        <div className="product-category">{selectedProduct[0]?.category}</div>
        <div className="product-description">{selectedProduct[0]?.description}</div>
        <div className="product-price">{selectedProduct[0]?.price}</div>
     </div>
  );
}

//title category and overview


  // useEffect(() => {
  //   const getQs = async () => {
  //     try {
  //       const res = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
  //         params: {
  //           product_id: 40344,
  //           page: 1,
  //           count: 5
  //         },
  //         headers: {
  //           'Authorization': `${TOKEN}`
  //         }
  //       });
  //       console.log(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getQs();
  // }, []);

