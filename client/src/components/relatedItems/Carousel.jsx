import React, {useContext} from 'react';
import AppContext from '../../AppContext.js';
import ScrollArrows from './ScrollArrows.jsx';
import Card from './Card.jsx';
import styled from 'styled-components';

/**
 * WILL BE THE OUTER DIV FOR BOTH LISTS: RELATED PRODUCTS AND YOUR OUTFIT
 */

// STYLES
const LeftArrow = styled.div`

`;

const RightArrow = styled.div`

`;

// CAROUSEL
export default function Carousel({ name, relatedProducts }) {

  return (
    <div className="carousel" >
      <div className="carousel-row" style={{display: 'flex'}} >
        <div className="carousel-left" onClick={()=> console.log('Left click')} >
          <ScrollArrows.LeftArrow />
        </div>
        <div className="carousel-middle" style={{display: 'flex'}} >
          {name === 'related-items'
            ? relatedProducts.map(product => <Card key={product.id} product={product} name="related-item" />)
            : <h4>OUTFIT LIST</h4>}
        </div>
        <div className="carousel-right" onClick={()=> console.log('Right click')} >
          <ScrollArrows.RightArrow />
        </div>
      </div>
    </div>
  );
}