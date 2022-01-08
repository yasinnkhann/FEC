import { getMaxLengthOfCombinedArrays, getFeatures, filterArraysByFeature, getValues, getRows, mapProductValues, mapCategories, formatWord, formatValue, capitalize } from './utils';
import React, { useState, useImperativeHandle, useCallback, useEffect, useContext, forwardRef, Suspense } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { union } from 'lodash';
import AppContext from '../../AppContext.js';
import ModalContext from './ModalContext.js';

const ActionButton = React.lazy(() => import('./ActionButton.jsx'));
const modalElement = document.getElementById('modal-root');

// MODAL
export const Modal = ({ product, fade = false }, ref) => {
  // CONTEXT
  const { selectedProductContext } = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [isOpen, setIsOpen] = useState(false);

  // HOOKS
  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setIsOpen(true);
      },
      close,
    }),
    [close]
  );

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
    const categoriesArray = union([...Object.keys(currentProduct)], [...Object.keys(comparedProduct)]);
    const formattedCurrentProductArray = mapProductValues([...Object.values(currentProduct)]);
    const formattedComparedProductArray = mapProductValues([...Object.values(comparedProduct)]);
    const formattedCategoriesArray = mapCategories(categoriesArray);

    return (
      filterArraysByFeature(formattedCurrentProductArray, formattedCategoriesArray, formattedComparedProductArray)
    );
  };

  const filterArraysByFeature = (currentProductArray, categoryArray, compareProductArray) => {
    const tableArray = [currentProductArray, categoryArray, compareProductArray];
    const len = getMaxLengthOfCombinedArrays(tableArray);
    let comparisonTable = [];

    for (let i = 0; i < len; i++) {
      comparisonTable.push(renderRows(tableArray[0][i], tableArray[1][i], tableArray[2][i]));
    }

    return comparisonTable;
  };

  // Returns a row === | product | category | product |
  const renderRows = (leftProduct, category, rightProduct) => {
    if (category === 'Name') {
      return renderNameColumn(leftProduct, category, rightProduct);
    } else if (category === 'Features') {
      const rightFeatures = getFeatures(rightProduct);
      const leftFeatures = getFeatures(leftProduct);
      const leftValues = getValues(leftProduct);
      const rightValues = getValues(rightProduct);
      const features = union(leftFeatures, rightFeatures);
      return getRows(leftProduct, features, rightProduct);
    } else {
      return;
    }
  };

  const getRows = (leftProduct, featuresArr, rightProduct) => {
    return featuresArr.map((feature) => {
      let left = null;
      let right = null;
      if (leftProduct && Array.isArray(leftProduct)) {
        for (let i = 0; i < leftProduct.length; i++) {
          let lProduct = leftProduct[i][1];
          if (lProduct.feature === feature) {
            left = lProduct.value;
          } else {
            null;
          }
        }
      }
      if (rightProduct && Array.isArray(rightProduct)) {
        for (let j = 0; j < rightProduct.length; j++) {
          let rProduct = rightProduct[j][1];
          if (rProduct.feature === feature) {
            right = rProduct.value;
          } else {
            null;
          }
        }
      }
      return renderRow(left, feature, right);
    });
  };

  const renderNameColumn = (leftProduct, category, rightProduct) => {
    return (
      <ModalBoldRow key={category ? category : null}>
        <td>{`${category}: ${leftProduct}`}</td>
        <td>{null}</td>
        <td>{`${category}: ${rightProduct}`}</td>
      </ModalBoldRow>
    );
  };

  const renderRow = (leftValue, feature, rightValue) => {
    return (
        <ModalRow key={feature ? feature : null}>
          <td> {typeof leftValue === 'boolean' ? <CheckIcon /> : !leftValue ? <NotInterestedIcon /> : leftValue} </td>
          <td> {feature} </td>
          <td> {typeof rightValue === 'boolean' ? <CheckIcon /> : !rightValue ? <NotInterestedIcon /> : rightValue} </td>
        </ModalRow>
    );
  };

  // JSX
  return createPortal(
    // Show or hide depending on click
    isOpen ? (
      <Suspense fallback={<h2>Loading...</h2>}>
        <ModalStyle className={`modal ${fade ? 'modal-fade' : ''}`}>
          <ModalOverlay onClick={close}>
            <ModalBody className="modal-body">
              <ModalClose onClick={close}>
                <ActionButton name="close-modal" />
              </ModalClose>
              <table>
                <thead>
                  <ModalBoldRow>
                    <ModalTitle><h2>Comparing</h2></ModalTitle>
                  </ModalBoldRow>
                </thead>
                <tbody>
                  {renderTable(product, selectedProduct)}
                </tbody>
              </table>
            </ModalBody>
          </ModalOverlay>
        </ModalStyle>
      </Suspense>
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
  color: black;
  margin: 0 auto;
  padding: 1px;
`;

const ModalBoldRow = styled.tr`
  font-weight: bold;
  color: black;
  margin: 0 auto;
  padding: 1px;
`;

const ModalTitle = styled.td`
  text-align: center;
  justify-content: center;
`;