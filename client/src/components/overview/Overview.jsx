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
      <StylesContext.Provider
        value={{
          stylesDataContent: [stylesData, setstylesData],
          currentStyleContent: [currentStyle, setCurrentStyle],
        }}
      >
        {loadingStatusStyles && (
          <>
            <Suspense fallback={<></>}>
              <MainImgContainer>
                <ImageGallery />
              </MainImgContainer>
            </Suspense>
          </>
        )}
      </StylesContext.Provider>
      <OverviewContainer>
        <ReviewsContext.Provider value={{ reviewsData, setreviewsData }}>
          {loadingStatusStyles && (
            <>
              <Suspense fallback={<></>}>
                <ReviewsStars />
              </Suspense>
            </>
          )}
        </ReviewsContext.Provider>
        <Suspense fallback={<></>}>
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
              <Suspense fallback={<></>}>
                <StyleSelector />
              </Suspense>
            </>
          )}
        </StylesContext.Provider>
      </OverviewContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 6rem 0;
   display grid;
    grid-template-columns: 40% 45%;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: "mainImg overview"
                         "mainImg overview";
    column-gap: 4rem;
`;

const MainImgContainer = styled.div`
  grid-area: mainImg;
  position: relative;
  height: 23rem;
  width: 100%;

  @media (min-width: 768px) {
    height: 41rem;
  }
`;

const OverviewContainer = styled.div`
  grid-area: overview;
  text-align: center;
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  @media (min-width: 768px) {
    grid-area: overview;
    text-align: center;
    margin-right: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
`;
