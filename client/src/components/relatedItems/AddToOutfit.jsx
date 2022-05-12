import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import UserContext from './UserContext.js';
import AddBoxIcon from '@material-ui/icons/AddBox';

// ADD TO OUTFIT
export default function AddToOutfit() {
  // CONTEXT
  const { selectedProductContext } = useContext(AppContext);
  const { outfitContext } = useContext(UserContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [userOutfit, setUserOutfit] = outfitContext;

  const addToOutfit = productToAdd => {
    if (userOutfit.length === 0) {
      setUserOutfit([productToAdd]);
    } else {
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
    }
  };

  // JSX
  return (
    <AddButtonStyle>
      <OutfitHeader>ADD TO OUTFIT</OutfitHeader>
      <AddBoxIcon
        onClick={() => addToOutfit(selectedProduct)}
        style={{ fontSize: 40, marginLeft: '5rem' }}
      />
    </AddButtonStyle>
  );
}
const OutfitHeader = styled.h3`
  text-align: center;
  margin-left: 2rem;
`;
const AddButtonStyle = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
