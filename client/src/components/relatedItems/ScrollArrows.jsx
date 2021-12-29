// Dependency imports
import React from 'react';

// SCROLL ARROWS
const ScrollArrow = ({ direction }) => {

  // JSX
  return (
    <div>
      <i className={`fas fa-angle-double-${direction}`} />
    </div>
  );
};

export default ScrollArrow;