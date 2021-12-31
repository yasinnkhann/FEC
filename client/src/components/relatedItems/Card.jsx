// Dependency imports
import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// API imports
import { TOKEN } from '../../config.js';

// Context imports
import AppContext from '../../AppContext.js';
import ModalContext from './ModalContext.js';

// Component imports
import ActionButton from './ActionButton.jsx';
import ProductPreviewImages from './ProductPreviewImages.jsx';
import ProductInfo from './ProductInfo.jsx';
import Modal from './Modal.jsx';

// CARD
export default function CarouselCard({ product }) {

  // CONTEXT
  const {selectedProductContext} = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [imageUrl, setimageUrl] = useState('');

  // REF
  const modal = useRef(null);

  // HOOKS
  useEffect(() => {
    getProductStyle(product.id);
  }, []);

  // API HANDLER
  const getProductStyle = async (id) => {
    await axios.get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      {
        params: {
          product_id: id
        },
        headers: {
          Authorization: `${TOKEN}`,
        },
      })
      .then(res => res.data.results[0].photos[0].thumbnail_url)
      .then(url => setimageUrl(url));
  };

  // EVENT HANDLERS
  const handleClick = (newSelectedProduct) => {
    setSelectedProduct(newSelectedProduct);
  };

  // JSX
  return (
    <CardStyle >
      <ActionStyle onClick={() => modal.current.open()}>
        <ActionButton name="open-modal" />
      </ActionStyle>
      <Modal key={product.id} ref={modal} product={product} />
      <ProductInfoStyle onClick={() => handleClick(product)} >
        <ProductPreviewImages imageUrl={imageUrl} productName={product.name} />
        <ProductInfo product={product} />
      </ProductInfoStyle>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 200px;
  height: 300px;
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const ProductInfoStyle = styled.div`
  width: 200px;
  height: 100%;
  position: absolute;
  bottom: 0;
  overflow: auto;
`;

const ActionStyle = styled.a`
  z-index: 1;
`;
