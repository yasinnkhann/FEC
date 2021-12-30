// look up lazy loading

// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// API imports
import { TOKEN } from '../../config.js';

// Context & Hooks imports
import AppContext from '../../AppContext.js';
import useWindowSize from './useWindowSize.js';

// Component imports
import ScrollArrow from './ScrollArrows.jsx';
import Card from './Card.jsx';

/**
 * WILL BE THE OUTER DIV FOR BOTH LISTS: RELATED PRODUCTS AND YOUR OUTFIT
 */

// CAROUSEL
export default function Carousel({ name, relatedProductIds }) {
  const {selectedProductContext} = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(relatedProducts.slice(currentCardIndex, maxCardIndex));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [maxCardIndex, setMaxCardIndex] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const size = useWindowSize();

  // HOOKS & INITILIZATION

  // Changes number of items shown based on window size
  useEffect(() => {
    if (relatedProducts[currentCardIndex]) { console.log('CURRENT CARD :: ', relatedProducts[currentCardIndex].data.name); }
    const newMaxIndex = getMaxIndexBasedOnScreenSize();
    setMaxCardIndex(newMaxIndex);
    changeVisibleProductsArray();
  }, [size]);

  // Populates relatedProducts state to render each item
  useEffect(() => {
    if (relatedProductIds !== undefined) {
      setRelatedProducts([]);
      setVisibleProducts([]);
      relatedProductIds.forEach(id => {
        updateRelatedProducts(id);
      });
    }

  }, [relatedProductIds]);

  useEffect(() => {
    resetVisibleProducts();
  }, [selectedProduct]);

  // API HANDLERS
  // Gets product info based on id
  const updateRelatedProducts = async (id) => {
    await axios.get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
      {
        params: {
          product_id: id
        },
        headers: {
          Authorization: `${TOKEN}`,
        },
      }
    )
      .then(productData => {
        setRelatedProducts(state => [...state, productData]);
        setVisibleProducts(state => [...state, productData]);
      })
      // .then(() => setVisibleProducts(relatedProducts.slice(currentCardIndex, maxCardIndex)))
      .then(() => setIsLoaded(true));
  };

  // EVENT HANDLERS
  // Click handler that adjusts items shown based on left arrow being clicked
  const scrollLeft = (e) => {
    const beginningIndex = 0;
    const isAtBeginningIndex = currentCardIndex === beginningIndex;
    if (isAtBeginningIndex || currentCardIndex - 1 < 0) {
      let maxIndex = getMaxIndexBasedOnScreenSize();
      setCurrentCardIndex(0);
      setMaxCardIndex(maxIndex);
    } else {
      setCurrentCardIndex(currentCardIndex - 1);
      setMaxCardIndex(maxCardIndex - 1);
    }

    changeVisibleProductsArray();
  };

  // Click handler that adjusts items shown based on right arrow being clicked
  const scrollRight = (e) => {
    // console.log(e);
    const finalIndex = relatedProducts.length - 1;
    console.log(`currentCardIndex: ${currentCardIndex}\nfinalIndex: ${finalIndex}`);
    const isAtFinalIndex = currentCardIndex === finalIndex;
    const newCurrentCardindex = isAtFinalIndex ? currentCardIndex - 1 : currentCardIndex + 1;

    setCurrentCardIndex(newCurrentCardindex);
    setMaxCardIndex(visibleProducts.length);

    changeVisibleProductsArray();
  };

  // HELPER FUNCTIONS
  const getMaxIndexBasedOnScreenSize = () => {
    const width = window.innerWidth;
    return (Math.floor(width / 200) - 1);
  };

  const changeVisibleProductsArray = () => {
    setVisibleProducts(relatedProducts.slice(0, maxCardIndex));
  };

  const resetVisibleProducts = () => {
    resetCurrentCardIndex();
    resetMaxCardIndex();
  };

  const resetCurrentCardIndex = () => {
    setCurrentCardIndex(0);
  };

  const resetMaxCardIndex = () => {
    const newMax = getMaxIndexBasedOnScreenSize();
    setMaxCardIndex(newMax);
  };

  // JSX
  return (
    <CarouselStyle className="carousel" >
      <div className="carousel-row" style={{display: 'flex'}} >
        <div className="carousel-left" onClick={(e) => scrollLeft(e)} >
          <LeftArrow>
            {currentCardIndex === 0 ? null : relatedProducts.length < maxCardIndex ? null : <ScrollArrow direction={'left'} />}
          </LeftArrow>
        </div>
        {isLoaded && relatedProducts.length >= 1
          ? <div className="carousel-middle" style={{display: 'flex'}} >
            {name === 'related-items'
              ? visibleProducts.map(product =>
                <Card key={product.data.id} product={product.data} name="related-item" />
              )
              : <h4>OUTFIT LIST</h4>}
          </div>
          : <div>Loading...</div>
        }
        <div className="carousel-right" onClick={(e) => scrollRight(e)} >
          <RightArrow>
            {relatedProducts.length - 1 < maxCardIndex ? null : currentCardIndex === relatedProducts.length - 1 ? null : <ScrollArrow direction={'right'} />}
          </RightArrow>
        </div>
      </div>
    </CarouselStyle>
  );
}


// STYLES
const CarouselStyle = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LeftArrow = styled.div`

`;

const RightArrow = styled.div`

`;