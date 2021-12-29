import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import styled from 'styled-components';
import ProductDetail from './ProductDetail.jsx';
import ProductDescription from './ProductDescription.jsx';
import Styles from './Styles.jsx';
import Reviews from './ReviewsApi.jsx';
import ImageGallery from './ImageGallery.jsx';

const Grid = styled.div `
display: grid;
grid-template-columns: 60% 40%;
grid-column-gap: 0.5rem;
grid-row-gap: 0.5rem;
margin-top: 2rem;
margin-bottom: 2rem;
`;
const Container = styled.div `
 grid-column-start: 2;
 grid-column-end: 3;
`;
const ImgContainer = styled.div `
grid-column-start: 1;
grid-column-end: 2;
padding: 2rem;
max-height: 700px;
max-width: 500px;
margin-left: 6rem;
`;
const Image = styled.img `
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 2rem;
 position: relative;
`;

export default function Overview() {
  const { productsContext } = useContext(AppContext);
  const selectedProduct = products.slice(0, 1);
  return (
    <Grid>
      <ImageGallery/>
      <Container>
        <Reviews />
        <ProductDetail
          product={selectedProduct[0]}
        />
        <Styles/>
      </Container>
      <ProductDescription
        product={selectedProduct[0]}
      />
    </Grid>

  );
}

