import React, { useState, useEffect, useContext, Suspense } from 'react';
import axios from 'axios';
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';
import styled from 'styled-components';
import {serverURL} from '../../config.js';

const Carousel = React.lazy(() => import('./Carousel.jsx'))

// RELATED ITEMS
export default function RelatedItems() {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);
  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userOutfit, setUserOutfit] = useState([]);

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
  return (
    <UserContext.Provider
      value={{
        userContext: [currentUser, setCurrentUser],
        outfitContext: [userOutfit, setUserOutfit],
      }}
    >
      <div className='related-items-and-comparison'>
        <Suspense fallback={<h2>Loading...</h2>}>
          <RelatedItemsHeader>Related Items</RelatedItemsHeader>
          <Carousel
            name='related-items'
            relatedProductIds={relatedProductIds}
          />
          <YourOutfitHeader>Your Outfit</YourOutfitHeader>
          <Carousel name='your-outfit' />
        </Suspense>
      </div>
    </UserContext.Provider>
  );
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