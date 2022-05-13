// Dependency imports
import React from 'react';
import styled from 'styled-components';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// SCROLL ARROWS
const ScrollArrow = ({ direction }) => {
  // JSX
  return (
    <span>
      {direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </span>
  );
};

export default ScrollArrow;
