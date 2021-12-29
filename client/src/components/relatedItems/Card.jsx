// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// API imports
import { TOKEN } from '../../config.js';

// Context imports
import AppContext from '../../AppContext.js';
import ModalContext from './ModalContext.js';

// Component imports
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
  const [showModal, setShowModal] = useState(false);

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

  const handleHover = () => {
    setShowModal(!showModal);
  };

  // JSX
  return (
    <CardStyle
      className="carousel-card"
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}
      onClick={() => handleClick(product)} >
      <ModalContext.Provider value={{modalContext: [showModal, setShowModal]}}>
        {showModal ? <Modal product={product}/> : null}
      </ModalContext.Provider>
      <ProductPreviewImages imageUrl={imageUrl} productName={product.name} />
      <ProductInfoStyle>
        <ProductInfo product={product} />
      </ProductInfoStyle>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 200px;
  height: 300px;
  border: 1px solid black;
  position: relative;
`;

const ProductInfoStyle = styled.div`
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 0;
  overflow: auto;
`;
