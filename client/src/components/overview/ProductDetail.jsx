import React from 'react';
import styled from 'styled-components';

const Name = styled.h1`
  margin-bottom: 0.5rem;
`;
const Category = styled.h3`
  text-transform: uppercase;
  font-weight: 100;
  font-family: 'Questrial', sans-serif;
`;

export default function ProductDetail({ product }) {
  return (
    <div>
      <Category>{product?.category}</Category>
      <Name>{product?.name}</Name>
    </div>
  );
}
