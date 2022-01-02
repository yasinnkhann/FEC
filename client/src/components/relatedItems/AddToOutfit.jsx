// Dependency imports
import React, { useContext } from 'react';
import styled from 'styled-components';

// Context imports
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';

// Icons
import AddBoxIcon from '@material-ui/icons/AddBox';

// ADD TO OUTFIT
export default function AddToOutfit() {
  // CONTEXT
  const {selectedProductContext} = useContext(AppContext);
  const {outfitContext} = useContext(UserContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [userOutfit, setUserOutfit] = outfitContext;

  const addToOutfit = (productToAdd) => {
    userOutfit.forEach(piece => {
      if (piece.id === productToAdd.id) {
        console.log('Same item!!', piece.id, productToAdd.id);
        return alert('Cannot add item already in outfit');
      } else {
        console.log('Different items!', piece.id, productToAdd.id);
        let newOutfit = [...userOutfit];
        newOutfit.push(productToAdd);
        setUserOutfit([...new Set(newOutfit)]);
      }
    });
  };

  // JSX
  return (
    <AddButtonStyle >
      <h3>ADD TO OUTFIT</h3>
      <AddBoxIcon onClick={() => addToOutfit(selectedProduct)} style={{ fontSize: 40 }} />
    </AddButtonStyle>
  );
}

const AddButtonStyle = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;