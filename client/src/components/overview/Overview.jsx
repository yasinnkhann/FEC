import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import styled from 'styled-components';
import ProductDetail from './ProductDetail.jsx';
import ProductDescription from './ProductDescription.jsx';
import Styles from './Styles.jsx';
import Reviews from './ReviewsApi.jsx';

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
max-width: 550px;
max-height: 700x;
`;
const Image = styled.img `
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 0;
 position: relative;
`;

export default function Overview() {
  const { products, setProducts } = useContext(AppContext);
  const selectedProduct = products.slice(0, 1);
  return (
    <Grid>
      <ImgContainer>
        <Image src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
      </ImgContainer>
      <Container>
        <Reviews />
        <ProductDetail
          product={selectedProduct[0]}
        />
      </Container>
      <ProductDescription
        product={selectedProduct[0]}
      />
      <Styles/>
    </Grid>

  );
}

