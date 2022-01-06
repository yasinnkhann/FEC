// Dependency imports
import React, { useContext, useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

// Context imports
import AppContext from '../../AppContext.js';

// State imports
import StarRating from './StarRating.jsx';

// PRODUCT INFO
export default function ProductInfo({ product }) {
  // STATE
  const [price, setPrice] = useState(product.default_price);
  const [hasSalePrice, setHasSalePrice] = useState(false);

  useEffect(() => {
    if (product.sale_price) {
      setPrice(product.sale_price);
      setHasSalePrice(true);
    }
  }, []);

  return (
    <Fragment>
      {product !== null ? (
        <InfoCardStyle className="product-info">
          <InfoCategory>{`Category: ${product.category}`}</InfoCategory>
          <InfoProductName>{product.name}</InfoProductName>
          {hasSalePrice ?
            <SalePrice>{'$' + price}</SalePrice>
            :
            <Price>{'$' + price}</Price>}
          <StarContainer>
            <StarRating product={product} />
          </StarContainer>
        </InfoCardStyle>
      ) : (
        <h3>This will be an outfit</h3>
      )}
    </Fragment>
  );
}
const StarContainer = styled.div`
  padding: 1rem;
  margin: 0px;
`;
const InfoCategory = styled.h4`
  font-style: italic;
  padding-left: 1rem;
  font-size: small;
`;
const InfoProductName = styled.h4`
  padding-left: 1rem;
`;


const Price = styled.h4`
  padding-left: 1rem;
  ${({ hasSalePrice }) =>
    hasSalePrice &&
    `
    text-decoration: line-through;
  `}
`;

const SalePrice = styled.h4`
  color: red;
`;

const InfoCardStyle = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
//light = #FDF0D5
//burgundy = #38062B
//silver = #B1A9AC