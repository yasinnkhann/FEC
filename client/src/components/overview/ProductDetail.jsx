import React from 'react';
import styled from 'styled-components';

export default function ProductDetail({ product }) {
  return (
    <>
      <Category>{product?.category}</Category>
      <Name>{product?.name}</Name>
    </>
  );
}

const Name = styled.h1`
  margin: 0;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Category = styled.h3`
  text-transform: uppercase;
  font-weight: 500;
  font-family: 'Questrial', sans-serif;
  margin: 0.5rem;

  @media (min-width: 768px) {
  }
`;
