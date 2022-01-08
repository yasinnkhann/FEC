import React, { useState, useEffect, useContext, Suspense } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  isAtFinalIndex,
  isAtBeginningIndex,
  getMaxIndexBasedOnScreenSize,
} from './utils';

// API imports

// Context & Hooks imports
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';
import useWindowSize from './useWindowSize.js';

// Component imports
// import ScrollArrow from './ScrollArrows.jsx';
// import Card from './Card.jsx';
import { serverURL } from '../../config.js';

const ScrollArrow = React.lazy(() => import('./ScrollArrows.jsx'));
const Card = React.lazy(() => import('./Card.jsx'));

// CAROUSEL
export default function Carousel({ name, relatedProductIds }) {
  const { selectedProductContext } = useContext(AppContext);
  const { userContext, outfitContext } = useContext(UserContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [userOutfit, setUserOutfit] = outfitContext;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [isLoaded, setIsLoaded] = useState(false);
  const size = useWindowSize();

  // HOOKS & INITILIZATION
  // Populates relatedProducts state to render each item
  useEffect(() => {
    setRelatedProducts([]);
    setVisibleProducts([]);

    // API HANDLERS
    const updateRelatedProducts = async id => {
      await axios
        .get(`${serverURL}/products/product`, {
          params: {
            product_id: id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(productData => {
          if (productData.data.name === 'Bright Future Sunglasses') {
            null;
          } else {
            setRelatedProducts(state => [...state, productData]);
          }
        })
        .catch(err => console.log(err));
    };

    if (relatedProductIds !== undefined) {
      relatedProductIds.forEach(id => {
        updateRelatedProducts(id);
      });
    }
    setIsLoaded(true);
  }, [relatedProductIds]);

  // Changes number of items shown based on window size
  useEffect(() => {
    const newEndIndex = getMaxIndexBasedOnScreenSize();
    if (newEndIndex < 3) {
      setEndIndex(newEndIndex);
    }
    let newVisibleProducts = relatedProducts.slice(startIndex, endIndex);
    setVisibleProducts(newVisibleProducts);
  }, [size, relatedProducts]);

  useEffect(() => {
    changeVisibleProductsArray(startIndex, endIndex);
  }, [startIndex]);

  const changeVisibleProductsArray = (newStartIndex, newEndIndex) => {
    const newRelatedProducts = relatedProducts.slice(
      newStartIndex,
      newEndIndex
    );
    setVisibleProducts(newRelatedProducts);
  };

  const renderCarousel = name => {
    if (isLoaded) {
      return getCarousel(name);
    } else {
      return <div>{`Loading. ${name}..`}</div>;
    }
  };

  // EVENT HANDLERS
  const getCarousel = name => {
    if (name === 'related-items') {
      if (visibleProducts && visibleProducts.length >= 1) {
        return visibleProducts.map(product => (
          <Card
            key={product.data.id}
            product={product.data}
            name='related-item'
            carouselName="related-items"
          />
        ));
      } else {
        return <div>Loading...</div>;
      }
    }
    if (name === 'your-outfit') {
      let outfitList = [];
      outfitList = userOutfit?.map(outfitPiece => (
        <Card
          key={outfitPiece.id}
          product={outfitPiece}
          name={outfitPiece.name}
          carouselName="your-outfit"
        />
      ));
      outfitList.unshift(<Card key='add-to-outfit' name='add-button' />);
      return outfitList;
    }
  };

  // Click handler that adjusts items shown based on left arrow being clicked
  const scrollLeft = e => {
    const relatedFirstIndex = relatedProducts[0];
    const visibleFirstIndex = visibleProducts[0];
    if (isAtBeginningIndex() || startIndex - 1 < 0) {
      setStartIndex(0);
      setEndIndex(visibleProducts.length);
    } else {
      setStartIndex(startIndex - 1);
      setEndIndex(endIndex - 1);
    }
    const newVisibleProducts = relatedProducts.slice(startIndex, endIndex);
    setVisibleProducts(newVisibleProducts);
  };

  // Click handler that adjusts items shown based on right arrow being clicked
  const scrollRight = e => {
    const relatedLastIndex = relatedProducts.length - 1;
    const visibleLastIndex = visibleProducts.length - 1;
    if (isAtFinalIndex()) {
      setStartIndex(relatedLastIndex - visibleLastIndex);
      setEndIndex(relatedLastIndex);
    } else {
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex + 1);
    }

    setVisibleProducts(relatedProducts.slice(startIndex, endIndex));
  };

  // JSX
  return (
    <CarouselStyle className="carousel" >
      <div className="carousel-row" style={{display: 'flex'}} >
        <Suspense fallback={<h2>Loading...</h2>}>
          {isAtBeginningIndex(relatedProducts, visibleProducts)
            ? <div style={{width: '40px'}}></div>
            : <BaseArrow className="carousel-left" onClick={(e) => scrollLeft(e)} >
                <LeftArrow>
                  <ScrollArrow direction={'left'} />
                </LeftArrow>
            </BaseArrow>}
          {
            <div className="carousel-middle" style={{display: 'flex', gap: '20px'}} >
                {renderCarousel(name)}
            </div>
          }
          {isAtFinalIndex(relatedProducts, visibleProducts)
            ? <div style={{width: '40px'}}></div>
            : visibleProducts.length === relatedProducts.length
              ? <div style={{width: '40px'}}></div>
              : <BaseArrow className="carousel-right" onClick={(e) => scrollRight(e)} >
                  <RightArrow>
                    <ScrollArrow direction={'right'} />
                  </RightArrow>
              </BaseArrow>}
        </Suspense>
      </div>
    </CarouselStyle>
  );
}

// STYLES

const CarouselStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  scroll-behavior: smooth;
`;

const BaseArrow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
`;

const LeftArrow = styled.div`
  background-color: #38062b;
  color: #fdf0d5;
`;

const RightArrow = styled.div`
  background-color: #38062b;
  color: #fdf0d5;
`;
