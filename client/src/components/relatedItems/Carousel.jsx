// look up lazy loading

// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// API imports
import { TOKEN } from '../../config.js';

// Context imports
import AppContext from '../../AppContext.js';

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
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // HOOKS & INITILIZATION
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
    getWindowDimensions();
  }, []);

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
    const newRelatedProducts = relatedProducts.slice(index);
    setCurrentCardIndex(index);
    setVisibleProducts(newRelatedProducts);
  };

  const scrollRight = () => {
    const finalIndex = relatedProducts.length - 1;
    const shouldResetIndex = currentCardIndex === finalIndex;
    const index = shouldResetIndex ? 0 : currentCardIndex + 1;
    const newRelatedProducts = relatedProducts.slice(index);
    setCurrentCardIndex(index);
    setVisibleProducts(newRelatedProducts);
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
              <ScrollArrow direction={'right'} />
            </RightArrow>
          </div>
        </div>
      </CarouselStyle>
    );
  } else {
    return (
      <CarouselStyle className="carousel" >
        <div className="carousel-row" style={{display: 'flex'}} >
          <div className="carousel-left" onClick={()=> console.log('Left click')} >
            <LeftArrow>
              <ScrollArrow />
            </LeftArrow>
          </div>
          <div>Loading...</div>
          <div className="carousel-right" onClick={()=> console.log('Right click')} >
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
`;

const LeftArrow = styled.div`

`;

const RightArrow = styled.div`

`;