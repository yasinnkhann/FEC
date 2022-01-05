// Dependency imports
import React from 'react';
import styled from 'styled-components';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// SCROLL ARROWS
const ScrollArrow = ({ direction }) => {
  // JSX
  return <span>{direction === 'left' ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}</span>;
};

export default ScrollArrow;