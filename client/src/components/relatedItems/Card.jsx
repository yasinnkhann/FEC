// Dependency imports
import React, { useState, useEffect, useContext } from 'react';

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
  const [showModal, setShowModal] = useState(false);


  // EVENT HANDLERS
  const handleClick = (newSelectedProduct) => {
    console.log(product.name, ' card clicked');
    setSelectedProduct(newSelectedProduct);
  };

  const handleHover = () => {
    setShowModal(!showModal);
  };

  // JSX
  return (
    <div
      className="carousel-card"
      style={{border: '1px solid black'}}
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}
      onClick={() => handleClick(product)} >
      <ModalContext.Provider value={{modalContext: [showModal, setShowModal]}}>
        {showModal ? <Modal product={product}/> : null}
      </ModalContext.Provider>
      <ProductPreviewImages product={product} />
      <ProductInfo product={product} />
    </div>
  );
}