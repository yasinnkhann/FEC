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

  // STATE
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [maxCardIndex, setMaxCardIndex] = useState(8);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const size = useWindowSize();

  // HOOKS & INITILIZATION
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

  // Changes number of items shown based on window size
  useEffect(() => {
    console.log(size);
    const width = window.innerWidth;
    const maxAllowableItems = Math.floor(width / 200);
    setMaxCardIndex(maxAllowableItems);
    setVisibleProducts(relatedProducts.slice(currentCardIndex, maxCardIndex));
  }, [size]);



  // API HANDLERS
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
      .then(() => setIsLoaded(true));
  };

  // EVENT HANDLERS
  const scrollLeft = () => {
    const finalIndex = relatedProducts.length - 1;
    const shouldResetIndex = currentCardIndex === 0;
    const index = shouldResetIndex ? finalIndex : currentCardIndex - 1;

    setCurrentCardIndex(index);

    const newRelatedProducts = relatedProducts.slice(currentCardIndex, maxCardIndex);

    setVisibleProducts(newRelatedProducts);
    currentCardIndex === 0 ? setIsAtBeginning(true) : setIsAtBeginning(false);
    currentCardIndex === finalIndex ? setIsAtEnd(true) : setIsAtEnd(false);
  };

  const scrollRight = () => {
    const finalIndex = relatedProducts.length - 1;
    const shouldResetIndex = currentCardIndex === finalIndex;
    const index = shouldResetIndex ? 0 : currentCardIndex + 1;

    setCurrentCardIndex(index);

    const newRelatedProducts = relatedProducts.slice(currentCardIndex, maxCardIndex);

    setVisibleProducts(newRelatedProducts);
    currentCardIndex === 0 ? setIsAtBeginning(true) : setIsAtBeginning(false);
    currentCardIndex === finalIndex ? setIsAtEnd(true) : setIsAtEnd(false);
  };

  // HELPER FUNCTIONS
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  };

  // JSX
  if (isLoaded && relatedProducts.length >= 1) {
    return (
      <CarouselStyle className="carousel" >
        <div className="carousel-row" style={{display: 'flex'}} >
          <div className="carousel-left" onClick={() => scrollLeft()} >
            <LeftArrow>
              {isAtBeginning ? null : <ScrollArrow direction={'left'} />}
            </LeftArrow>
          </div>
          <div className="carousel-middle" style={{display: 'flex'}} >
            {name === 'related-items'
              ? visibleProducts.map(product =>
                <Card key={product.data.id} product={product.data} name="related-item" />
              )
              : <h4>OUTFIT LIST</h4>}
          </div>
          <div className="carousel-right" onClick={() => scrollRight()} >
            <RightArrow>
              {relatedProducts.length <= maxCardIndex ? null : isAtEnd ? null : <ScrollArrow direction={'right'} />}
            </RightArrow>
          </div>
        </div>
      </CarouselStyle>
    );
  } else {
    return (
      <CarouselStyle className="carousel" >
        <div className="carousel-row" style={{display: 'flex'}} >
          <div className="carousel-right" onClick={() => scrollLeft()} >
            <LeftArrow>
              <ScrollArrow />
            </LeftArrow>
          </div>
          <div>Loading...</div>
          <div className="carousel-right" onClick={() => scrollRight()} >
            <RightArrow>
              <ScrollArrow />
            </RightArrow>
          </div>
        </div>
      </CarouselStyle>
    );
  }
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