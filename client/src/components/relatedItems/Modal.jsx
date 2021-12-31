// Dependency imports
import React, { useState, useImperativeHandle, useCallback, useEffect, useContext, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

// Context imports
import ModalContext from './ModalContext.js';
import AppContext from '../../AppContext.js';
// Component imports
import ActionButton from './ActionButton.jsx';

const modalElement = document.getElementById('modal-root');

// MODAL
export const Modal = ({ product, fade = false }, ref) => {


  // CONTEXT
  const {selectedProductContext} = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [isOpen, setIsOpen] = useState(false);

  // HOOKS
  useImperativeHandle(ref, () => ({
    open: () => { setIsOpen(true); },
    close
  }), [close]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape, false);
      document.addEventListener('click', handleEscape, false);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
      document.addEventListener('click', handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  // HELPER FUNCTIONS
  // Closes modal
  const close = () => {
    setIsOpen(false);
  };

  // Triggers close on escape keydown or click
  const handleEscape = useCallback(e => {
    if (e.keyCode === 27) {close(); }
  }, [close]);

  const renderComparison = (currentProduct, selectedProduct) => {

    let currentProductArray = Object.entries(currentProduct);
    let selectedProductArray = Object.entries(selectedProduct);

    console.log(currentProductArray);

    return (
      <ul className="categories">
        {
          currentProductArray.map(product => {
            let category = formatWord(product[0]);
            return (
              <CategoryListItem key={currentProduct.id}>
                {category}
              </CategoryListItem>
            );
          })
        }
      </ul>
    );
  };

  const formatWord = (wordToBeFormatted) => {
    let capitalizedWord = capitalize(wordToBeFormatted);
    let formattedWord = capitalizedWord.replace('_', ' ');
    return formattedWord;
  };

  const capitalize = (wordToCapitalize) => {
    if (typeof wordToCapitalize !== 'string') {
      wordToCapitalize = wordToCapitalize.toString();
    }
    let capitalizedWord = wordToCapitalize.toLowerCase();
    let firstLetter = capitalizedWord.slice(0, 1).toUpperCase();
    capitalizedWord = firstLetter.concat(capitalizedWord.slice(1));
    console.log(capitalizedWord);
    return capitalizedWord;
  };

  // JSX
  return createPortal(

    // Show or hide depending on click
    isOpen ? (
      <ModalStyle className={`modal ${fade ? 'modal-fade' : ''}`}>
        <ModalOverlay onClick={close} >
          <ModalClose onClick={close} >
            <ActionButton name="close-modal" />
          </ModalClose>
        </ModalOverlay>
        <ModalBody className="modal-body">
          {/* ACTUAL INFO */}
          {renderComparison(product, selectedProduct)}
        </ModalBody>
      </ModalStyle>
    ) : null,
    modalElement
  );
};

export default forwardRef(Modal);

// STYLES
const fadeIn = keyframes`
  0% {
    animation-timing-function: cubic-bezier(0.2242, 0.7499, 0.3142, 0.8148);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalStyle = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5em 1em;
  z-index: 999999;
  box-sizing: border-box;
`;

const ModalFade = styled.div`
  animation: ${fadeIn} 1s 1 linear;
  animation-fill-mode: forwards;
  opacity: 0;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalClose = styled.a`
  position: absolute;
  right: 15px;
  top: 10px;
  color: #5e5e5e;
  cursor: pointer;
  font-size: 1.25em;
  padding: 7px;
  background: rgba(1, 1, 1, 0.749);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  :hover & {
    background: rgba(1, 1, 1, 0.989);
  }
`;

const ModalBody = styled.div`
  z-index: 2;
  position: relative;
  justify-content: center;
  margin: 0 auto;
  background-color: #303030;
  border: 1px solid rgba(1, 1, 1, 0.25);
  border-radius: 3px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 500px;
  height: 350px;
  padding: 15px 20px;
  color: #c3c0c0;
`;

const CategoryList = styled.ul`

`;

const CategoryListItem = styled.li`
  list-style-type: none;
`;