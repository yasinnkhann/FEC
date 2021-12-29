import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';



export default function RelatedItems() {
  // CONTEXT
  const {productsValue, selectedProductValue} = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductValue;
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getRelatedProductIds();
  }, [selectedProduct]);

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
