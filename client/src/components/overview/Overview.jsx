import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import AppContext from '../../AppContext.js';
import styled from 'styled-components';
// import ProductDetail from './ProductDetail.jsx';
// import ImageGallery from './ImageGallery.jsx';
import axios from 'axios';
import ReviewsContext from './ReviewsContext.js';
// import ReviewsStars from './ReviewsStars.jsx';
// import StyleSelector from './StyleSelector.jsx';
import StylesContext from './StylesContext.js';
// import Icons from './Icons.jsx';

import { serverURL } from '../../config.js';

const ProductDetail = lazy(() => import('./ProductDetail.jsx'));
const ImageGallery = lazy(() => import('./ImageGallery.jsx'));
const ReviewsStars = lazy(() => import('./ReviewsStars.jsx'));
const StyleSelector = lazy(() => import('./StyleSelector.jsx'));
const Icons = lazy(() => import('./Icons.jsx'));

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 700px;
  padding: 1rem;
`;
const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Container = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  padding-top: 5rem;
`;

const Slogan = styled.h3`
  font-size: large;
`;
const Description = styled.p`
  font-style: italic;
  max-width: 600px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  padding-top: 3rem;
`;

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
    <div className='overview' id='product-overview'>
      <Layout>
        <Grid>
          <StylesContext.Provider
            value={{
              stylesDataContent: [stylesData, setstylesData],
              currentStyleContent: [currentStyle, setCurrentStyle],
            }}
          >
            {/* {loadingStatusStyles && <ImageGallery />} */}
            {loadingStatusStyles && (
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <ImageGallery />
                </Suspense>
              </>
            )}
          </StylesContext.Provider>
          <Container>
            <ReviewsContext.Provider value={{ reviewsData, setreviewsData }}>
              {/* {loadingStatusReviews && <ReviewsStars />} */}
              {loadingStatusStyles && (
                <>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReviewsStars />
                  </Suspense>
                </>
              )}
            </ReviewsContext.Provider>
            {/* <ProductDetail product={selectedProduct} /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetail product={selectedProduct} />
            </Suspense>
            <StylesContext.Provider
              value={{
                stylesDataContent: [stylesData, setstylesData],
                currentStyleContent: [currentStyle, setCurrentStyle],
              }}
            >
              {/* {loadingStatusStyles && <StyleSelector />} */}
              {loadingStatusStyles && (
                <>
                  <Suspense fallback={<div>Loading...</div>}>
                    <StyleSelector />
                  </Suspense>
                </>
              )}
            </StylesContext.Provider>
            {/* <Icons /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Icons />
            </Suspense>
          </Container>
        </Grid>
        <InfoBox>
          <Slogan>{selectedProduct.slogan}</Slogan>
          <Description>{selectedProduct.description}</Description>
        </InfoBox>
      </Layout>
    </div>
  );
}
