import React from 'react';
import styled from 'styled-components';

const Slogan = styled.h3`
  margin-left: 6.5rem;
`;
const Description = styled.p`
  margin-left: 2rem;
`;

export default function ProductDescription({ product }) {
  return (
    <div>
      <Slogan>{product?.slogan}</Slogan>
      <Description>{product?.description}</Description>
    </div>
  );
}
