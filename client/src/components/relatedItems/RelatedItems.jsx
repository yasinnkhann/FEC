// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Context imports
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';

// API imports
import { TOKEN } from '../../config.js';

// Component imports
import Carousel from './Carousel.jsx';

// Dummy data import
import dummyUser from './dummyUser.js';

// Variables
// const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
const URL = 'http://localhost:3000/api';

// RELATED ITEMS
export default function RelatedItems() {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);

  // STATE

  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(dummyUser.name);
  const [userOutfit, setUserOutfit] = useState(dummyUser.outfit);

  // HOOKS
  useEffect(() => {
    let clearId = setTimeout(() => {
      // API HANDLER
      const getRelatedProductIds = async () => {
        try {
          const res = await axios.get(
            `${URL}/products/related`,
            // `${URL}products/${selectedProduct.id}/related`,
            {
              params: {
                product_id: selectedProduct.id
              },
              // headers: {
              //   Authorization: `${TOKEN}`,
              // },
            }
          );
          setIsLoaded(true);
          console.log(res);
          let noDupedIds = Array.from(new Set(res.data));
          setRelatedProductIds(noDupedIds);
        } catch (err) {
          console.error(err);
        }
      };
      getRelatedProductIds();
    }, 800);

    return () => clearTimeout(clearId);
  }, [selectedProduct]);

  // JSX
  if (isLoaded && relatedProductIds.length >= 1) {
    return (
      <UserContext.Provider
        value={{
          userContext: [currentUser, setCurrentUser],
          outfitContext: [userOutfit, setUserOutfit],
        }}
      >
        <div className='related-items-and-comparison'>
          <h3>RELATED ITEMS</h3>
          <Carousel
            name='related-items'
            relatedProductIds={relatedProductIds}
          />
          <h3>YOUR OUTFIT</h3>
          <Carousel name='your-outfit' />
        </div>
      </UserContext.Provider>
    );
  } else {
    return (
      <div className='related-items-and-comparison'>
        <h3>RELATED ITEMS</h3>
        <h2>Loading...</h2>
        <h3>YOUR OUTFIT</h3>
        <h2>Loading...</h2>
      </div>
    );
  }
}
