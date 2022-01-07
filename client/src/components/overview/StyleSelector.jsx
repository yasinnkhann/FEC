import React, { useContext, useState } from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';
import { Photo } from '@material-ui/icons';
import axios from 'axios';
import CheckIcon from '@material-ui/icons/Check';

const URL = 'http://34.223.4.224:80/api';

const Checked = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #38062b;
`;

const StylePicsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 260px;
  justify-content: center;
`;

const StylePic = styled.img`
  height: 70px;
  margin: 5px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const StyleName = styled.h3`
  font-family: 'Lobster Two';
`;
const SelectedStyle = styled.h3``;
const Button = styled.button`
  position: relative;
  background-color: #b1a9ac;
  border: 2px solid #38062b;
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
const Dropdown = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  width: 260px;
  padding-top: 2rem;
`;

const QuantityContainer = styled.div``;
const SizeContainer = styled.div``;
const DropDownListContainer = styled.div``;
const DropDownHeader = styled.button`
  padding: 1rem;
  padding-left: 1rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #fdf0d5;
  width: 130px;
  background-color: #38062b;
`;

const DropdownList = styled.div`
  padding: 1rem;
  background-color: #b1a9ac;
  border: 2px solid #38062b;
  box-sizing: border-box;
  font-size: large;
  font-weight: 500;
`;
const DropdownOption = styled.select`
  list-style: none;
  margin-bottom: 0.8em;
`;

const ListItem = styled.option`
  list-style: none;
  margin-bottom: 0.8em;
`;

const OutOfStock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  padding: 2rem;
  background-color: #38062b;
  color: red;
  justify-content: center;
  border: 1px solid black;
`;
const AddtoCartButton = styled.button`
  padding: 1.5rem;
  grid-column: 1 / -1;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  width: 260px;
  color: #fdf0d5;
  background-color: #38062b;
`;

const SelectASize = styled.div`
  font-size: 1rem;
`;

export default function StyleSelector() {
  const { stylesDataContent, currentStyleContent } = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const results = stylesData.results;
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isQuantOpen, setIsQuantOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [quantityOptions, setQuantityOptions] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const sizes = () => {
    const sizeArray = [];
    Object.keys(currentStyle.skus).forEach(key => {
      currentStyle.skus[key].quantity ? sizeArray.push(key) : null;
    });
    return sizeArray;
  };

  const stylesList = sizes();
  const sizeQuantity = () => {
    var obj = {};
    Object.values(currentStyle.skus).forEach(value => {
      if (!obj[value.size]) {
        obj[value.size] = value.quantity;
      } else {
        obj[value.size] = obj[value.size] + value.quantity;
      }
    });
    return obj;
  };

  const onPhotoClick = value => {
    setCurrentStyle(value);
    setSelectedQuantity(1);
    setSelectedSize(null);
  };

  const uniqueSizes = () => {
    return Array.from(new Set(sizes().map(sku => currentStyle.skus[sku].size)));
  };

  const togglingSize = () => setIsSizeOpen(!isSizeOpen);
  const togglingQuant = () => setIsQuantOpen(!isQuantOpen);

  const quantobj = sizeQuantity();

  const onSizeClicked = e => {
    setSelectedSize(e.target.innerHTML);
    setQuantityOptions(quantobj[e.target.innerHTML]);
    setIsSizeOpen(false);
    setShowMessage(false);
  };

  const onQuantityClicked = e => {
    setSelectedQuantity(parseInt(e.target.innerHTML));
    setIsQuantOpen(false);
  };
  const addToCartHandler = e => {
    selectedSize ? addInCart() : badCartHandler();
  };

  const badCartHandler = () => {
    setIsSizeOpen(true);
    setShowMessage(true);
  };

  const quantityArr = () => {
    const quantityArray = [];
    var max;
    if (quantityAmount >= 15) {
      max = 15;
    } else {
      max = quantityAmount;
    }
    for (var i = 1; i <= max; i++) {
      quantityArray.push(i);
    }
    return quantityArray;
  };

  const getSkuId = Object.keys(currentStyle.skus).filter(key => {
    return currentStyle.skus[key].size === selectedSize;
  });

  const addInCart = async e => {
    try {
      const body = {
        sku_id: getSkuId[0],
      };
      const res = await axios.post(`${URL}/cart/addToCart`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('res: ', res);
    } catch (err) {
      console.error(err);
    }
  };
  const quantityAmount = quantityOptions;

  return (
    <div>
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
          <Dropdown>
            <div>
              <>
                {showMessage ? (
                  <SelectASize>Please Select a Size</SelectASize>
                ) : null}
                <DropDownHeader onClick={togglingSize}>
                  {!selectedSize ? 'Select A Size' : 'Size: ' + selectedSize}
                </DropDownHeader>
                {isSizeOpen && (
                  <DropDownListContainer>
                    <DropdownList>
                      {uniqueSizes().map(size => (
                        <ListItem
                          onClick={e => onSizeClicked(e)}
                          key={Math.random()}
                        >
                          {size}
                        </ListItem>
                      ))}
                    </DropdownList>
                  </DropDownListContainer>
                )}
              </>
            </div>
            <div>
              {selectedSize ? (
                <DropDownHeader onClick={togglingQuant}>
                  {!selectedQuantity
                    ? 'Quantity: 1'
                    : 'Quantity: ' + selectedQuantity}
                </DropDownHeader>
              ) : (
                <DropDownHeader>-</DropDownHeader>
              )}
              {isQuantOpen && (
                <DropDownListContainer>
                  <DropdownList>
                    {quantityArr().map(num => {
                      return (
                        <ListItem
                          onClick={e => onQuantityClicked(e)}
                          key={Math.random()}
                        >
                          {num}
                        </ListItem>
                      );
                    })}
                  </DropdownList>
                </DropDownListContainer>
              )}
            </div>
            <AddtoCartButton onClick={e => addToCartHandler(e)}>
              Add to Cart
            </AddtoCartButton>
          </Dropdown>
        </>
      ) : (
        <OutOfStock>OUT OF STOCK</OutOfStock>
      )}
    </div>
  );
}
