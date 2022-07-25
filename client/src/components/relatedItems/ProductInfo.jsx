import React, { useState, useEffect, Fragment, Suspense } from 'react';
import styled from 'styled-components';
const StarRating = React.lazy(() => import('./StarRating.jsx'));

// PRODUCT INFO
export default function ProductInfo({ product, styles, salePrice }) {
  // STATE
  const [price, setPrice] = useState(product.default_price);
  const [hasSalePrice, setHasSalePrice] = useState(false);

  useEffect(() => {
    if (salePrice) {
      setPrice(salePrice);
      setHasSalePrice(true);
    }
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<></>}>
        {product !== null ? (
          <InfoContainer className='product-info'>
            <InfoCategory>Category: {product.category}</InfoCategory>
            <InfoProductName>{product.name}</InfoProductName>
            {hasSalePrice ? (
              <SalePrice>{'$' + price}</SalePrice>
            ) : (
              <Price>{'$' + price}</Price>
            )}
            <StarRating product={product} />
          </InfoContainer>
        ) : (
          <h3>This will be an outfit</h3>
        )}
      </Suspense>
    </Fragment>
  );
}

const InfoCategory = styled.p`
  font-family: 'Questrial', sans-serif;
  font-size: 0.6rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const InfoProductName = styled.p`
  margin: 0 auto;
  font-size: 0.7rem;
  font-weight: bolder;
  margin-top: 0.2rem;

  @media (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Price = styled.p`
  margin: 0 auto;
  margin: 0.5rem 0;
  font-family: 'Fjalla One', sans-serif;
  font-size: 0.8rem;
  ${({ hasSalePrice }) =>
    hasSalePrice &&
    `
    text-decoration: line-through;
  `}

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const SalePrice = styled.p`
  color: red;
  margin: 0 auto;
  margin-top: 0.5rem;
  font-family: 'Fjalla One', sans-serif;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  align-content: center;
  justify-content: flex-start;
`;
