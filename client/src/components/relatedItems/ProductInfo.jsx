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
      { product !== null ?
        <InfoCardStyle className="product-info" >
          <Info>{product.name}</Info>
          <SalePrice>
            {product.sale_price ? `Sale price! $${price}` : null}
          </SalePrice>
          <Price>
            {`Price: $${price}`}
          </Price>
          <Info>{`Category: ${product.category}`}</Info>
          <Info>
            <StarRating product={product} />
          </Info>
          <Info>
            <StarRating />
          </Info>
        </InfoCardStyle>
        : <h3>This will be an outfit</h3>
      }
    </Fragment>
  );
}

const Info = styled.h4`
  margin: 0px;
`;

const Price = styled.h4`
  margin: 0px;
  ${({ hasSalePrice }) => hasSalePrice && `
    text-decoration: line-through;
  `}
`;

const SalePrice = styled.h4`
  color: red;
`;

const InfoCardStyle = styled.div`
  width: 200px;
  height: 100px;
  margin: 0px;

`;