import React, { useState, useEffect, useContext, Suspense } from 'react';
import styled from 'styled-components';
import StylesContext from '../overview/StylesContext.js';
const ActionButton = React.lazy(() => import('./ActionButton.jsx'));

// PRODUCT PREVIEW IMAGES
export default function ProductPreviewImages({ imageUrl, productName }) {
  // JSX
  return (
    <Suspense fallback={<a>Loading...</a>}>
      <Image src={imageUrl} alt={productName} />
    </Suspense>
  );
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
