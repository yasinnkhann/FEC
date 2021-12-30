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
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const size = useWindowSize();

  // HOOKS & INITILIZATION

  // Changes number of items shown based on window size
  useEffect(() => {
    // if (relatedProducts[startIndex]) { console.log('CURRENT CARD :: ', relatedProducts[startIndex].data.name); }
    const newEndIndex = getMaxIndexBasedOnScreenSize();
    setEndIndex(newEndIndex - 1);
    changeVisibleProductsArray(startIndex, endIndex);
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



    return () => {

      resetVisibleProducts();
    };
  }, [relatedProductIds]);

  // Reset shown products when new item is selected
  useEffect(() => {

    return () => resetVisibleProducts();
  }, [selectedProduct]);

  useEffect(() => {
    setVisibleProducts(relatedProducts.slice(startIndex, endIndex));
  }, [startIndex]);

  // API HANDLERS
  // Gets one product's info based on id
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
        visibleProducts.length <= 5
          ? setVisibleProducts(state => [...state, productData])
          : null;
      })
      .then(() => setIsLoaded(true))
      .catch(err => console.log(err));
  };

  // EVENT HANDLERS
  // Click handler that adjusts items shown based on left arrow being clicked
  const scrollLeft = (e) => {
    const relatedFirstIndex = relatedProducts[0];
    const visibleFirstIndex = visibleProducts[0];
    if (isAtBeginningIndex() || startIndex - 1 < 0) {
      setStartIndex(0);
      setEndIndex(visibleProducts.length);
    } else {
      setStartIndex(startIndex - 1);
      setEndIndex(endIndex - 1);
      // startIndex - 1 < 0 ? setStartIndex(0) : setStartIndex(startIndex - 1);
      // startIndex - 1 < 0 ? setEndIndex(visibleProducts.length - 1) : setEndIndex(endIndex - 1);
    }
    const newVisibleProducts = relatedProducts.slice(startIndex, endIndex);
    setVisibleProducts(newVisibleProducts);
    // changeVisibleProductsArray(startIndex, endIndex);
  };

  // Click handler that adjusts items shown based on right arrow being clicked
  const scrollRight = (e) => {
    const relatedLastIndex = relatedProducts.length - 1;
    const visibleLastIndex = visibleProducts.length - 1;
    if (isAtFinalIndex()) {
      setStartIndex(relatedLastIndex - visibleLastIndex);
      setEndIndex(relatedLastIndex);
    } else {
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex + 1);
    }

    changeVisibleProductsArray(startIndex, endIndex);
  };

  // HELPER FUNCTIONS

  // Checks the last item of all products and last item of shown products and checks if they are the same
  const isAtFinalIndex = () => {
    if (!relatedProducts[relatedProducts.length - 1] || !visibleProducts[visibleProducts.length - 1]) { return; }
    const finalRelatedItem = relatedProducts[relatedProducts.length - 1].data.id;
    const finalVisibleItem = visibleProducts[visibleProducts.length - 1].data.id;
    return finalVisibleItem === finalRelatedItem;
  };

  // Checks the first item of all products and first item of shown products and checks if they are the same
  const isAtBeginningIndex = () => {
    if (!relatedProducts[0] || !visibleProducts[0]) { return; }
    const firstRelatedItem = relatedProducts[0].data.id;
    const firstVisibleItem = visibleProducts[0].data.id;
    return firstVisibleItem === firstRelatedItem;
  };

  // Resets start and end index then changes shown products based on new indices
  const resetVisibleProducts = () => {
    changeVisibleProductsArray(0, 5);
  };

  // Divides width of inner window by width of a card and rounds up to the nearest integer
  // then returns it. If the remainder of window width divided by card width is above zero
  // then the previous calculation is return, if not then we hard set the return value to 1
  const getMaxIndexBasedOnScreenSize = () => {
    const width = window.innerWidth;
    const maxIndexBasedOnScreenSize = width % 200 > 0 ? Math.ceil(width / 200) : 1;
    return maxIndexBasedOnScreenSize;
  };

  // Takes a start and end index and sets the shown products to the result of slicing all products with index params
  const changeVisibleProductsArray = (newStartIndex, newEndIndex) => {
    const newVisibleProducts = relatedProducts.slice(newStartIndex, newEndIndex);
    setVisibleProducts(newVisibleProducts);
  };

  // JSX
  return (
    <CarouselStyle className="carousel" >
      <div className="carousel-row" style={{display: 'flex'}} >
        {isAtBeginningIndex() ? null : <button className="carousel-left" onClick={(e) => scrollLeft(e)} >
          <LeftArrow>
            <ScrollArrow direction={'left'} />
          </LeftArrow>
        </button>}
        {isLoaded && visibleProducts.length >= 1
          ? <div className="carousel-middle" style={{display: 'flex'}} >
            {name === 'related-items'
              ? visibleProducts.map(product =>
                <Card key={product.data.id} product={product.data} name="related-item" />
              )
              : <h4>OUTFIT LIST</h4>}
          </div>
          : <div>Loading...</div>
        }
        {isAtFinalIndex() ? null : <button className="carousel-right" onClick={(e) => scrollRight(e)} >
          <RightArrow>
            <ScrollArrow direction={'right'} />
          </RightArrow>
        </button>}
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