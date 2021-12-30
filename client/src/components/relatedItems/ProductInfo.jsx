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
          <Infoh4>{product.name}</Infoh4>
          <Infoh4>{product.sale_price ? `Sale price! $${price}` : `Price: $${price}` }</Infoh4>
          <Infoh4>{`Category: ${product.category}`}</Infoh4>
          <Infoh4>
            <StarRating product={product} />
          </Infoh4>
          <Infoh4>
            <StarRating />
          </Infoh4>
        </InfoCardStyle>
        : <h3>This will be an outfit</h3>
      }
    </Fragment>
  );
}

const Infoh4 = styled.h4`
  margin: 0px;
`;

const InfoCardStyle = styled.div`
  width: 200px;
  height: 100px;
  margin: 0px;

`;