import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';



export default function RelatedItems() {
  // CONTEXT
  const {selectedProductValue} = useContext(AppContext)
  const [selectedProduct, setSelectedProduct] = selectedProductValue

  // STATE
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/:${selectedProduct.id}`,
          {
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        console.log('RELATED res.data::', res.data);
        setRelatedProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getRelatedProducts();
  }, [])

  return (
    <div className="related-items-and-comparison" >
      <h3>RELATED ITEMS</h3>
      <Carousel name="related-items"/>
      <h3>YOUR OUTFIT</h3>
      <Carousel name="your-outfit" />
    </div>
  );
}
