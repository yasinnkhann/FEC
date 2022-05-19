import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import AppContext from '../../AppContext.js';
import styled from 'styled-components';
import axios from 'axios';
import ReviewsContext from './ReviewsContext.js';
import StylesContext from './StylesContext.js';
import { serverURL } from '../../config.js';

const ProductDetail = lazy(() => import('./ProductDetail.jsx'));
const ImageGallery = lazy(() => import('./ImageGallery.jsx'));
const ReviewsStars = lazy(() => import('./ReviewsStars.jsx'));
const StyleSelector = lazy(() => import('./StyleSelector.jsx'));
const Icons = lazy(() => import('./Icons.jsx'));

export default function Overview() {
  const { productsContext } = useContext(AppContext);
  const [products, setProducts] = productsContext;
  const { selectedProductContext } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [reviewsData, setreviewsData] = useState([]);
  const [loadingStatusReviews, setLoadingStatusReviews] = useState(false);
  const [loadingStatusStyles, setLoadingStatusStyles] = useState(false);
  const [stylesData, setstylesData] = useState([]);
  const [currentStyle, setCurrentStyle] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(`${serverURL}/reviews/meta`, {
          params: {
            product_id: selectedProduct.id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setreviewsData(res.data);
        setLoadingStatusReviews(true);
      } catch (err) {
        console.error(err);
      }
    };
    getReviews();
  }, [selectedProduct]);
  useEffect(() => {
    const getStyles = async () => {
      try {
        const res = await axios.get(`${serverURL}/products/styles`, {
          params: {
            product_id: selectedProduct.id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setstylesData(res.data);
        setCurrentStyle(res.data.results[0]);
        setLoadingStatusStyles(true);
      } catch (err) {
        console.error(err);
      }
    };
    getStyles();
  }, [selectedProduct]);
  return (
    <MainContainer id='product-overview'>
      <Grid>
        <StylesContext.Provider
          value={{
            stylesDataContent: [stylesData, setstylesData],
            currentStyleContent: [currentStyle, setCurrentStyle],
          }}
        >
          {loadingStatusStyles && (
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <ImageGallery />
              </Suspense>
            </>
          )}
        </StylesContext.Provider>
        <OverviewContainer>
          <ReviewsContext.Provider value={{ reviewsData, setreviewsData }}>
            {loadingStatusStyles && (
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <ReviewsStars />
                </Suspense>
              </>
            )}
          </ReviewsContext.Provider>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail product={selectedProduct} />
          </Suspense>
          <StylesContext.Provider
            value={{
              stylesDataContent: [stylesData, setstylesData],
              currentStyleContent: [currentStyle, setCurrentStyle],
            }}
          >
            {loadingStatusStyles && (
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <StyleSelector />
                </Suspense>
              </>
            )}
          </StylesContext.Provider>
          <Suspense fallback={<div>Loading...</div>}>
            <Icons />
          </Suspense>
        </OverviewContainer>
      </Grid>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 6rem 0;
`;

const Grid = styled.div`
  display grid;
  grid-template-columns: 40% 60%;
  grid-template-areas: 
  'mainImg overview' 
  'mainImg overview';
  grid-gap: 1rem;
`;

const OverviewContainer = styled.div`
  grid-area: overview;
  text-align: center;
  width: fit-content;
  padding: 0 1rem 0 5rem;
`;
