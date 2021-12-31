// Dependency imports
import React, { useState, useImperativeHandle, useCallback, useEffect, useContext, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';

// Context imports
import AppContext from '../../AppContext.js';
import ModalContext from './ModalContext.js';
import StylesContext from '../overview/StylesContext.js';
// Component imports
import ActionButton from './ActionButton.jsx';

const modalElement = document.getElementById('modal-root');

// MODAL
export const Modal = ({ product, fade = false }, ref) => {


  // CONTEXT
  const {selectedProductContext} = useContext(AppContext);
  const {stylesDataContent, currentStyleContent} = useContext(StylesContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const [stylesData, setstylesData] = stylesDataContent;
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

  // HELPER FUNCTIONS: Event Handlers
  // Closes modal
  const close = () => {
    setIsOpen(false);
  };

  // Triggers close on escape keydown or click
  const handleEscape = useCallback(e => {
    if (e.keyCode === 27) { close(); }
  }, [close]);


  // HELPER FUNCTIONS: Table Rendering
  const renderTable = (currentProduct, comparedProduct) => {
    const categoriesArray = _.union([...Object.keys(currentProduct)], [...Object.keys(comparedProduct)]);
    const formattedCurrentProductArray = mapProductValues([...Object.values(currentProduct)]);
    const formattedComparedProductArray = mapProductValues([...Object.values(comparedProduct)]);
    const formattedCategoriesArray = mapCategories(categoriesArray);

    return (
      renderRows(formattedCurrentProductArray, formattedCategoriesArray, formattedComparedProductArray)
    );
  };

  const renderRows = (currentProductArray, categoryArray, compareProductArray) => {
    const tableArray = [currentProductArray, categoryArray, compareProductArray];
    const len = {
      length: Math.max(...[...tableArray.map(e => e.length), tableArray.length])
    };
    let comparisonTable = [];

    for (let i = 0; i < len.length; i++) {
      comparisonTable.push(renderRow(tableArray[0][i], tableArray[1][i], tableArray[2][i]));
    }
    return comparisonTable;
  };

  // Returns a row === | product | category | product |
  const renderRow = (leftProduct, category, rightProduct) => {
    if (category === 'Features') {
      leftProduct.forEach(product => console.log(product));
    }
    return (
      <tr>
        <td>{leftProduct}</td>
        <td>{category}</td>
        <td>{rightProduct}</td>
      </tr>
    );
  };

  // HELPER FUNCTIONS: Formatting
  const mapProductValues = (listToMap) => {
    return listToMap.map(currentValue => {
      if (typeof currentValue === 'object' ) {
        return [...Object.entries(currentValue)];
      } else {
        return formatValue(currentValue);
      }
    });

  };

  const mapCategories = (categoryList) => {
    return categoryList.map(product => {
      return formatWord(product);
    });
  };

  const formatWord = (wordToBeFormatted) => {
    let capitalizedWord = capitalize(wordToBeFormatted);
    let formattedWord = capitalizedWord.replace('_', ' ');
    return formattedWord;
  };

  const formatValue = (valueToFormat) => {
    return valueToFormat.toString();
  };

  const capitalize = (wordToCapitalize) => {
    if (typeof wordToCapitalize !== 'string') {
      wordToCapitalize = wordToCapitalize.toString();
    }
    let capitalizedWord = wordToCapitalize.toLowerCase();
    let firstLetter = capitalizedWord.slice(0, 1).toUpperCase();
    capitalizedWord = firstLetter.concat(capitalizedWord.slice(1));
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
          <ModalBody className="modal-body">
            <table>
              <thead>
                <tr>
                  <td>Comparison</td>
                </tr>
              </thead>
              <tbody>
                {renderTable(product, selectedProduct)}
              </tbody>
            </table>
            {/* ACTUAL INFO */}
            {/* {renderDetails(product, 'product')}
            {renderCategories(product, selectedProduct)}
            {renderDetails(selectedProduct, 'selected-product')} */}
          </ModalBody>
        </ModalOverlay>
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
  display: flex;
  flex-direction: row;
  text-align: center;
  z-index: 2;
  position: relative;
  justify-content: center;
  margin: 0 auto;
  background-color: white;
  border: 1px solid rgba(1, 1, 1, 0.25);
  border-radius: 3px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 500px;
  height: 350px;
  padding: 15px 20px;
  color: #c3c0c0;
`;

const CategoryRowItem = styled.tr`
  color: rgba(65, 65, 65, 1);
  list-style-type: none;
  margin: 0 auto;
  padding: 5px;
  max-width: 150px;
`;

const ModalRow = styled.tr`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 1px;
`;



// const mapProductValues = (listToMap, id) => {
//   let mappedList = listToMap.map(currentValue => {
//     let formattedCurrentValue;
//     if (typeof currentValue === 'object' ) {
//       return <br></br>;
//     } else {
//       formattedCurrentValue = formatValue(currentValue);
//     }
//     return (
//       <CategoryRowItem key={`${formattedCurrentValue}-${id}`}>
//         {typeof currentValue === 'object' ? <br></br> : currentValue }
//       </CategoryRowItem>
//     );
//   });
//   return mappedList;
// };

// const mapCategories = (categoryList, id) => {
//   let mappedCategories = categoryList.map(product => {
//     let category = formatWord(product);
//     return (
//       <CategoryRowItem key={`${category}-${id}`}>
//         {category}
//       </CategoryRowItem>
//     );
//   });
//   return mappedCategories;
// };