import React, { useState, useEffect, useContext, Suspense } from 'react';
import styled from 'styled-components';
import StylesContext from '../overview/StylesContext.js';
const ActionButton = React.lazy(() => import('./ActionButton.jsx'));

// PRODUCT PREVIEW IMAGES
export default function ProductPreviewImages({ imageUrl, productName }) {

  // JSX
  return (
    <Suspense fallback={<></>}>
        <Image src={imageUrl} alt={productName} />
    </Suspense>
  )
}

const Image = styled.img`
  width: 208px;
  height: 200px;
  object-fit: cover;
`;