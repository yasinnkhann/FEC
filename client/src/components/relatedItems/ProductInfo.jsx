import React, { useContext, useState, useEffect, Fragment, Suspense } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
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
      <Suspense fallback={<h2>Loading...</h2>}>
        {product !== null ? (
          <InfoCardStyle className="product-info">

            <InfoCategory>Category: {product.category}</InfoCategory>
            <InfoProductName>{product.name}</InfoProductName>
            {hasSalePrice ?
              <SalePrice>{'$' + price}</SalePrice>
              :
              <Price>{'$' + price}</Price>}
              <StarRating product={product} />
          </InfoCardStyle>
        ) : (
          <h3>This will be an outfit</h3>
        )}
      </Suspense>
    </Fragment>
  );
}
const StarContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;
`;
const InfoCategory = styled.h4`
  font-family: 'Questrial', sans-serif;
  padding-left: 1rem;
  font-size: small;
  margin: 0 auto;
`;

const InfoProductName = styled.h4`
  padding-left: 1rem;
  margin: 0 auto;
`;


const Price = styled.h4`
  margin: 0 auto;
  padding-left: 1rem;
  font-family: 'Fjalla One', sans-serif;
  ${({ hasSalePrice }) =>
    hasSalePrice &&
    `
    text-decoration: line-through;
  `}
`;

const SalePrice = styled.h4`
  color: red;
  margin: 0 auto;
`;

const InfoCardStyle = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;