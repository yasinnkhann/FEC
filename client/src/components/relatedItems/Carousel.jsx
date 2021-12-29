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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (relatedProductIds !== undefined) {
      setRelatedProducts([]);
      relatedProductIds.forEach(id => {
        updateRelatedProducts(id);
      });
    }
  }, [relatedProductIds]);

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
      .then(console.log(id))
      // .then(product => console.log(product.data))
      .then(productData => setRelatedProducts(state => [...state, productData]))
      .then(() => setIsLoaded(true));
  };

  if (isLoaded && relatedProducts.length >= 1) {
    return (
      <div className="carousel" >
        <div className="carousel-row" style={{display: 'flex'}} >
          <div className="carousel-left" onClick={()=> console.log('Left click')} >
            <LeftArrow>
              <ScrollArrow />
            </LeftArrow>
          </div>
          <div className="carousel-middle" style={{display: 'flex'}} >
            {name === 'related-items'
              ? relatedProducts.map(product =>
                <Card key={product.data.id} product={product.data} name="related-item" />
              )
              : <h4>OUTFIT LIST</h4>}
          </div>
          <div className="carousel-right" onClick={()=> console.log('Right click')} >
            <RightArrow>
              <ScrollArrow />
            </RightArrow>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="carousel" >
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
      </div>
    );
  }
}


// STYLES
const LeftArrow = styled.div`

`;

const RightArrow = styled.div`

`;