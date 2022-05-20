import React, { useContext, useState } from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';
import axios from 'axios';
import CheckIcon from '@material-ui/icons/Check';
import { serverURL } from '../../config.js';

export default function StyleSelector() {
  const { stylesDataContent, currentStyleContent } = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const results = stylesData.results;
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    size: '',
    quantity: 0,
  });

  const sizes = () => {
    const sizeArray = [];
    Object.keys(currentStyle.skus).forEach(key => {
      currentStyle.skus[key].quantity ? sizeArray.push(key) : null;
    });
    return sizeArray;
  };

  const stylesList = sizes();

  const onPhotoClick = value => {
    setCurrentStyle(value);
    setSelectedQuantity(1);
    setSelectedSize(null);
  };

  const uniqueSizes = () => {
    return Array.from(new Set(sizes().map(sku => currentStyle.skus[sku].size)));
  };

  const addToCartHandler = e => {
    selectedSize ? addInCart() : badCartHandler();
  };

  const badCartHandler = () => {
    setIsSizeOpen(true);
    setShowMessage(true);
  };

  const getSkuId = Object.keys(currentStyle.skus).filter(key => {
    return currentStyle.skus[key].size === selectedSize;
  });

  const addInCart = async () => {
    try {
      const body = {
        sku_id: getSkuId[0],
      };
      const res = await axios.post(`${serverURL}/cart/addToCart`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('res: ', res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setSelectedOptions({ ...selectedOptions, hasChanged: true, [name]: value });
  };

  return (
    <>
      {stylesList.length ? (
        <>
          <Price>
            {currentStyle.sale_price ? (
              <>
                <Sale> {'$' + currentStyle.sale_price}</Sale>
                <OldPrice>{'$' + currentStyle.original_price}</OldPrice>
              </>
            ) : (
              '$' + currentStyle.original_price
            )}
          </Price>
          <SelectedStyle>Selected Style: </SelectedStyle>
          <StyleName key={currentStyle.style_id}>{currentStyle.name}</StyleName>
          <StylePicsDiv>
            {results.map(photo => {
              return (
                <Button
                  onClick={() => onPhotoClick(photo)}
                  key={photo.style_id}
                >
                  <StylePic src={photo.photos[0].thumbnail_url}></StylePic>
                  {currentStyle.name === photo.name ? (
                    <Checked>
                      <CheckIcon />
                    </Checked>
                  ) : null}
                </Button>
              );
            })}
          </StylePicsDiv>
          {!selectedOptions.size && selectedOptions.hasChanged && (
            <SelectASizeText>Please Select a Size</SelectASizeText>
          )}
          <DropdownContainer>
            <>
              <SizeSelect name='size' onChange={handleChange}>
                <SizeOption value=''>Select A Size</SizeOption>
                {uniqueSizes().map(size => (
                  <SizeOption key={size} value={size}>
                    Size: {size}
                  </SizeOption>
                ))}
              </SizeSelect>
            </>
            <>
              {selectedOptions.size ? (
                <QuantitySelect name='quantity' onChange={handleChange}>
                  <QuantityOption value=''>Select Quantity</QuantityOption>
                  {[...Array(8).keys()].map(quantity => (
                    <QuantityOption key={quantity + 1} value={quantity + 1}>
                      Quantity: {quantity + 1}
                    </QuantityOption>
                  ))}
                </QuantitySelect>
              ) : (
                <QuantityBtn>-</QuantityBtn>
              )}
            </>
            <AddToCartBtn onClick={e => addToCartHandler(e)}>
              Add to Cart
            </AddToCartBtn>
          </DropdownContainer>
        </>
      ) : (
        <OutOfStock>OUT OF STOCK</OutOfStock>
      )}
    </>
  );
}

const Checked = styled.div`
  color: #38062b;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const StylePicsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StylePic = styled.img`
  margin: 1rem;
  height: 3.75rem;
  width: 3.75rem;
  border-radius: 50%;
  object-fit: cover;
`;

const StyleName = styled.h3`
  font-family: 'Lobster Two';
  color: #38062b;
`;

const SelectedStyle = styled.h3``;

const Button = styled.button`
  background-color: bisque;
  border: 2px solid #38062b;
  position: relative;
`;

const Price = styled.h3`
  font-family: 'Fjalla One', sans-serif;
`;

const Sale = styled.p`
  color: red;
`;

const OldPrice = styled.p`
  text-decoration: line-through;
`;

const DropdownContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'size quantity'
    'addCart addCart';
  grid-column-gap: 1rem;
  margin-top: 1rem;
`;

const OutOfStock = styled.div`
  color: red;
  background: #38062b;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
`;
const AddToCartBtn = styled.button`
  grid-area: addCart;
  padding: 1.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #fdf0d5;
  background-color: #38062b;
  margin-top: 1rem;
`;

const SelectASizeText = styled.p`
  font-size: 1rem;
`;

const QuantityBtn = styled.button`
  background-color: #38062b;
  color: #fdf0d5;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  grid-area: quantity;
  border: none;
`;

const SizeSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #38062b;
  color: #fdf0d5;
  font-size: 1rem;
  outline: none;
  text-align: center;
  margin: 0 auto;
  padding: 1.7rem;
`;

const SizeOption = styled.option``;

const QuantitySelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #38062b;
  color: #fdf0d5;
  font-size: 1rem;
  outline: none;
  text-align: center;
  margin: 0 auto;
  padding: 1.3rem;
`;

const QuantityOption = styled.option``;
