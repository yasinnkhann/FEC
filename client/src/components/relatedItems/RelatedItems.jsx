// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Context imports
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';

// Component imports
import Carousel from './Carousel.jsx';

// Dummy data import
import dummyUser from './dummyUser.js';
import styled from 'styled-components';

// Variables
import {serverURL} from '../../config.js';

// RELATED ITEMS
export default function RelatedItems() {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);

  // STATE

  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(dummyUser.name);
  const [userOutfit, setUserOutfit] = useState([]);

  // HOOKS
  // API HANDLER
  useEffect(() => {
      const getRelatedProductIds = async () => {
        try {
          const res = await axios.get(
            `${serverURL}/products/related`,
            {
              params: {
                product_id: selectedProduct.id
              },
            }
          );
          setIsLoaded(true);
          let noDupedIds = Array.from(new Set(res.data));
          setRelatedProductIds(noDupedIds);
        } catch (err) {
          console.error(err);
        }
      };
      getRelatedProductIds();

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
          <RelatedItemsHeader>Related Items</RelatedItemsHeader>
          <Carousel
            name='related-items'
            relatedProductIds={relatedProductIds}
          />
          <YourOutfitHeader>Your Outfit</YourOutfitHeader>
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
const RelatedItemsHeader = styled.h3`
   font-size: xx-large;
   text-align: center;
   padding-bottom: 1rem;
   font-family: 'Lobster Two', cursive;
   color: #38062B;
`;

const YourOutfitHeader = styled.h3`
   font-size: x-large;
   text-align: center;
   padding-bottom: 1rem;
   font-family: 'Lobster Two', cursive;
   color: #38062B;
`;