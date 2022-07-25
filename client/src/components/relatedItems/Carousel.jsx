import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { isAtFinalIndex, isAtBeginningIndex } from './utils';

// Context & Hooks imports
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';
import useWindowSize from './useWindowSize.js';
import { serverURL } from '../../config.js';

const ScrollArrow = lazy(() => import('./ScrollArrows.jsx'));
const Card = lazy(() => import('./Card.jsx'));

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

  // HOOKS & INITIALIZATION
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
            carouselName='related-items'
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
          carouselName='your-outfit'
        />
      ));
      outfitList.unshift(<Card key='add-to-outfit' name='add-button' />);
      return outfitList;
    }
  };

  // Click handler that adjusts items shown based on left arrow being clicked
  const scrollLeft = () => {
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
  const scrollRight = () => {
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
    renderArrow('right');
  };

  const renderArrow = direction => {
    if (visibleProducts.length < 4) {
      return;
    }

    if (visibleProducts.length === 4 && relatedProducts.length === 4) {
      return;
    }

    if (
      relatedProducts.length > 4 &&
      visibleProducts[startIndex]?.data?.id === relatedProducts[0]?.data?.id &&
      direction === 'left'
    ) {
      return;
    }

    if (
      relatedProducts.length > 4 &&
      visibleProducts.at(-1)?.data?.id === relatedProducts.at(-1)?.data?.id &&
      direction === 'right'
    ) {
      return;
    }

    return (
      <ArrowContainer
        onClick={() =>
          `${direction}` === 'left' ? scrollLeft() : scrollRight()
        }
      >
        <ScrollArrow direction={direction} />
      </ArrowContainer>
    );
  };

  return (
    <CarouselStyle className='carousel'>
      <CarouselRow>
        <Suspense fallback={<></>}>
          {renderArrow('left')}
          {<CarouselMiddle>{renderCarousel(name)}</CarouselMiddle>}
          {renderArrow('right')}
        </Suspense>
      </CarouselRow>
    </CarouselStyle>
  );
}

const CarouselStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  scroll-behavior: smooth;
  padding: 0 0.5rem;
`;

const ArrowContainer = styled.div`
  background-color: #38062b;
  color: #fdf0d5;
  margin-top: 1.6rem;
  border: none;
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
`;

const CarouselRow = styled.div`
  display: flex;
`;

const CarouselMiddle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 640px) {
    flex-wrap: nowrap;
  }
`;
