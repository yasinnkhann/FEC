import React, {useContext} from 'react';
import AppContext from '../../AppContext.js';
import ScrollArrows from './ScrollArrows.jsx';
import Card from './Card.jsx';

/**
 * WILL BE THE OUTER DIV FOR BOTH LISTS: RELATED PRODUCTS AND YOUR OUTFIT
 */

export default function Carousel() {
  const {products, setProducts} = useContext(AppContext);
  const productsShown = products.slice(0, 10);
  return (
    <div className="carousel" >
      This is the carousel
      <div className="carousel-row" style={{display: 'flex'}} >
        <div className="carousel-left" onClick={()=> console.log('Left click')} >
          <ScrollArrows.LeftArrow />
        </div>
        <div className="carousel-middle" style={{display: 'flex'}} >
          {productsShown.map(product => <Card key={product.id} product={product} />)}
        </div>
        <div className="carousel-right" onClick={()=> console.log('Right click')} >
          <ScrollArrows.RightArrow />
        </div>
      </div>
    </div>
  );
}