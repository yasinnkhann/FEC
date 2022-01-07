import React, { useContext, useState } from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';
import { Photo } from '@material-ui/icons';
import axios from 'axios';
import CheckIcon from '@material-ui/icons/Check';

const URL = 'http://localhost:3000/api'

const Checked = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #38062B;
`;
//dark #1F0318
//light #E5F2C9
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

//silver #adadad
//blue #849a9a
//dark #072636
//red #3c0225
const StyleName = styled.h3`
  font-style: italic;
`;
const SelectedStyle = styled.h3`

`;
const Button = styled.button`
  position: relative;
  background-color: #B1A9AC;
  border: 2px solid #38062B;
`;
const Price = styled.h3`
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
  /* margin: 0.5rem; */
  padding-left: 1rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #B1A9AC;
  width: 130px;
  background-color: #38062B;
`;

const DropdownList = styled.div`
  padding: 1rem;
  background-color: #B1A9AC;
  border: 2px solid #38062B;
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
  background-color: #38062B;
  color: red;
  /* margin: 1rem;
  margin-left: 2.5rem; */
  justify-content: center;
  border: 1px solid black;
`;
const AddtoCartButton = styled.button`
  padding: 1.5rem;
  grid-column: 1 / -1;
  /* margin: 0.5rem; */
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  width: 260px;
  color: #FDF0D5;
  background-color: #38062B;

`;
//silver #adadad
//blue #849a9a
//dark #072636
//red #3c0225
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
    Object.keys(currentStyle.skus).forEach((key) => {
      currentStyle.skus[key].quantity ? sizeArray.push(key) : null;
    });
    return sizeArray;
  };

  const stylesList = sizes();
  const sizeQuantity = () => {
    var obj = {};
    Object.values(currentStyle.skus).forEach((value) => {
      if (!obj[value.size]) {
        obj[value.size] = value.quantity;
      } else {
        obj[value.size] = obj[value.size] + value.quantity;
      }
    });
    return obj;
  };
  //console.log(results);

  const onPhotoClick = (value) => {
    setCurrentStyle(value);
    setSelectedQuantity(1);
    setSelectedSize(null);
  };

  //console.log(currentStyle.skus);

  const uniqueSizes = () => {
    return Array.from(new Set(sizes().map((sku) => currentStyle.skus[sku].size)));
  };
  //console.log('quantity ', currentStyle.skus);

  const togglingSize = () => setIsSizeOpen(!isSizeOpen);
  const togglingQuant = () => setIsQuantOpen(!isQuantOpen);

  const quantobj = sizeQuantity();

  const onSizeClicked = (e) => {
    setSelectedSize(e.target.innerHTML);
    setQuantityOptions(quantobj[e.target.innerHTML]);
    setIsSizeOpen(false);
    setShowMessage(false);
  };

  const onQuantityClicked = (e) => {
    setSelectedQuantity(parseInt(e.target.innerHTML));
    setIsQuantOpen(false);
  };
  const addToCartHandler = (e) => {
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

  const getSkuId = Object.keys(currentStyle.skus).filter((key) => {
    return currentStyle.skus[key].size === selectedSize;
  });

  const addInCart = async (e) => {
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
            {results.map((photo) => {
              return (
                <Button onClick={() => onPhotoClick(photo)} key={photo.style_id}>
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
                {showMessage ? <SelectASize>Please Select a Size</SelectASize> : null}
                <DropDownHeader onClick={togglingSize}>
                  {!selectedSize ? 'Select A Size' : 'Size: ' + selectedSize}
                </DropDownHeader>
                {isSizeOpen && (
                  <DropDownListContainer>
                    <DropdownList>
                      {uniqueSizes().map((size) => (
                        <ListItem onClick={(e) => onSizeClicked(e)} key={Math.random()}>
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
                  {!selectedQuantity ? 'Quantity: 1' : 'Quantity: ' + selectedQuantity}
                </DropDownHeader>
              ) : (
                <DropDownHeader>-</DropDownHeader>
              )}
              {isQuantOpen && (
                <DropDownListContainer>
                  <DropdownList>
                    {quantityArr().map((num) => {
                      return (
                        <ListItem onClick={(e) => onQuantityClicked(e)} key={Math.random()}>
                          {num}
                        </ListItem>
                      );
                    })}
                  </DropdownList>
                </DropDownListContainer>
              )}
            </div>
            <AddtoCartButton onClick={(e) => addToCartHandler(e)}>Add to Cart</AddtoCartButton>
          </Dropdown>
        </>
      ) : (
        <OutOfStock>OUT OF STOCK</OutOfStock>
      )}
    </div>
  );
}

// useEffect(() => {
//   const getCart = async () => {
//     try {
//       const res = await axios.get(
//         'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
//         {
//           headers: {
//             Authorization: `${TOKEN}`,
//           },
//         }
//       );
//       const whatever = await Promise.all(res.data);
//       console.log(whatever);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   getCart();
// }, []);
//console.log(new Promise(getCart()));
