// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// Context imports
import StylesContext from '../overview/StylesContext.js';

// PRODUCT PREVIEW IMAGES
export default function ProductPreviewImages({ imageUrl, productName }) {

  // JSX
  return (
    <Image src={imageUrl} alt={productName} />
  );
}

const Image = styled.img`
  width: 200px;
  height: 200px;
  float: left;
  object-fit: contain;
  grid-row-end: span 2;
`;