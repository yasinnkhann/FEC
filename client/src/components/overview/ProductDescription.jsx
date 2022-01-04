import React from 'react';
import styled from 'styled-components';

const Slogan = styled.h3``;
const Description = styled.p``;
const InfoBox = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin-left: 10rem;
  padding-bottom: 2rem;
`;

export default function ProductDescription({ product }) {
  return (
    <InfoBox>
      <Slogan>{product?.slogan}</Slogan>
      <Description>{product?.description}</Description>
    </InfoBox>
  );
}
