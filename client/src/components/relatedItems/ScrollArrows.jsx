// Dependency imports
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styled from 'styled-components';

// SCROLL ARROWS
const ScrollArrow = ({ direction }) => {
  // JSX
  return (
    <>{direction === 'left' ? <StyledLeftArrow /> : <StyledRightArrow />}</>
  );
};

export default ScrollArrow;

const StyledRightArrow = styled(ChevronRightIcon)`
  &&& {
    font-size: 2rem;
  }
`;

const StyledLeftArrow = styled(ChevronLeftIcon)`
  &&& {
    font-size: 2rem;
  }
`;
