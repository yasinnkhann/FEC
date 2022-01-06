import React from 'react';
import styled from 'styled-components';

const Name = styled.h1`
  margin-bottom: 0.5rem;
  /* margin-left: 1rem; */
`;
const Category = styled.h3`
  text-transform: uppercase;
  font-weight: 100;
  /* margin-left: 4rem; */
`;
const Description = styled.p`
  padding: 0.5rem;
`;
//silver #adadad
//blue #849a9a
//dark #072636
//red #3c0225
export default function ProductDetail({ product }) {
  return (
    <div>
      <Category>{product?.category}</Category>
      <Name>{product?.name}</Name>
    </div>
  );
}
