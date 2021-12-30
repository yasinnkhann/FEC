// Dependency imports
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// SCROLL ARROWS
const ScrollArrow = ({ direction }) => {

  // JSX
  return (
    <div>
      {
        direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />
      }
    </div>
  );
};

export default ScrollArrow;