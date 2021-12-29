// Dependency imports
import React from 'react';

// SCROLL ARROWS
const ScrollArrow = ({ direction, clickFunction, glyph}) => {


  // JSX
  return (
    <div onClick={ clickFunction }>
      <i className={`fas fa-angle-double-${direction}`} >{ glyph }</i>
    </div>
  );
};

export default ScrollArrow;