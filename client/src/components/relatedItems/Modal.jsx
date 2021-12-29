// Dependency imports
import React, { useState, useEffect, useContext } from 'react';

// Context imports
import ActionButton from './ActionButton.jsx';
import ModalContext from './ModalContext.js';

// MODAL
export default function Modal({ product }) {

  // JSX
  return (
    <div className="modal" >
      <ActionButton />
      <div>This will be a modal</div>
      <h5>{product.name}</h5>
    </div>
  );
}