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

  useEffect(() => {
    if (product.sale_price) {
      setPrice(product.sale_price);
    }
  }, []);

  return (
    <Fragment>
      { product !== null ?
        <InfoCardStyle className="product-info" >
          <InfoDetailStyle>{product.name}</InfoDetailStyle>
          <InfoDetailStyle>{product.sale_price ? `Sale price! $${price}` : `Price: $${price}` }</InfoDetailStyle>
          <InfoDetailStyle>{`Category: ${product.category}`}</InfoDetailStyle>
          <InfoDetailStyle>★★★★★</InfoDetailStyle>
          {/* <InfoDetailStyle>{`Rating ${<StarRating />}`}</InfoDetailStyle> */}
        </InfoCardStyle>
        : <h3>This will be an outfit</h3>
      }
    </Fragment>
  );
}

const InfoDetailStyle = styled.h4`
  margin: 0px;
`;

const InfoCardStyle = styled.div`
  width: 200px;
  height: 100px;
  margin: 0px;

`;