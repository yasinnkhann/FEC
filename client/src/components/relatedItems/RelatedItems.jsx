// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Context imports
import AppContext from '../../AppContext.js';

// API imports
import { TOKEN } from '../../config.js';

// Component imports
import Carousel from './Carousel.jsx';

// Variables
const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

// RELATED ITEMS
export default function RelatedItems() {

  // CONTEXT
  const {productsContext, selectedProductContext} = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // HOOKS
  useEffect(() => {
    getRelatedProductIds();
  }, [selectedProduct]);

  // API HANDLER
  const getRelatedProductIds = async () => {
    try {
      const res = await axios.get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${selectedProduct.id}/related`,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      setIsLoaded(true);
      setRelatedProductIds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // JSX
  if (isLoaded && relatedProductIds.length >= 1) {
    return (
      <div className="related-items-and-comparison" >
        <h3>RELATED ITEMS</h3>
        <Carousel name="related-items" relatedProductIds={relatedProductIds}/>
        <h3>YOUR OUTFIT</h3>
        <Carousel name="your-outfit" />
      </div>
    );
  } else {
    return (
      <div className="related-items-and-comparison" >
        <h3>RELATED ITEMS</h3>
        <h2>Loading...</h2>
        <h3>YOUR OUTFIT</h3>
        <Carousel name="your-outfit" />
      </div>
    );
  }
}
