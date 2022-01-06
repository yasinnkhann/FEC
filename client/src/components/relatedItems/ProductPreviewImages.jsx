// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// Context imports
import StylesContext from '../overview/StylesContext.js';

// PRODUCT PREVIEW IMAGES
export default function ProductPreviewImages({ imageUrl, productName }) {
  // JSX
  return <Image src={imageUrl} alt={productName} />;
}

const Image = styled.img`
  width: 208px;
  height: 200px;
  object-fit: cover;
`;
//light = #FDF0D5
//burgundy = #38062B
//silver = #B1A9AC