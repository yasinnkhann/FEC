import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import axios from 'axios';
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';
import styled from 'styled-components';
import { serverURL } from '../../config.js';

const Carousel = lazy(() => import('./Carousel.jsx'));

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
        const res = await axios.get(`${serverURL}/products/related`, {
          params: {
            product_id: selectedProduct.id,
          },
        });
        setIsLoaded(true);
        let noDupedIds = Array.from(new Set(res.data));
        setRelatedProductIds(noDupedIds);
      } catch (err) {
        console.error(err);
      }
    };
    getRelatedProductIds();
  }, [selectedProduct]);

  return (
    <UserContext.Provider
      value={{
        userContext: [currentUser, setCurrentUser],
        outfitContext: [userOutfit, setUserOutfit],
      }}
    >
      <MainContainer id='related-items'>
        <RelatedItemsHeader>Related Items</RelatedItemsHeader>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Carousel
            name='related-items'
            relatedProductIds={relatedProductIds}
          />
        </Suspense>
        <YourOutfitHeader>Your Outfit</YourOutfitHeader>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Carousel name='your-outfit' />
        </Suspense>
      </MainContainer>
    </UserContext.Provider>
  );
}
const RelatedItemsHeader = styled.h3`
  font-size: xx-large;
  text-align: center;
  font-family: 'Lobster Two', cursive;
  color: #38062b;
`;

const YourOutfitHeader = styled.h3`
  font-size: x-large;
  text-align: center;
  font-family: 'Lobster Two', cursive;
  color: #38062b;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: -6rem;

  @media (min-width: 768px) {
    margin-top: 11rem;
  }
`;
