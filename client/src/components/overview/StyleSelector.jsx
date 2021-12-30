import React, {useContext, useState} from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';
import { Photo } from '@material-ui/icons';
//import fbIcon from './icons/fbmetaiconnew.png';
//import pinIcon from './icons/pinteresticonnew.png';
//import twitterIcon from './icons/twittericon.jpg';
// import fbIcon from './fbmetaicon.jpg';
// import fbIcon from './fbmetaicon.jpg';

const StylePicsDiv = styled.div `
  display: flex;
  flex-wrap: wrap;
  width: 295px;
  border: 1px solid;
`;
const StylePic = styled.img `
  height: 70px;
  margin: 5px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
`;
const StyleName = styled.p `
  font-weight: 100;
  margin-left: 4rem;
`;
const SelectedStyle = styled.h3 `
  font-weight: 100;
  margin-left: 4rem;
`;
const Button = styled.button `
  margin: 5px;
`;
const Price = styled.h3`
  margin-left: 5rem;
`;
const Sale = styled.p `
  color: red;
`;
const OldPrice = styled.p `
  text-decoration: line-through;
`;
const Dropdown = styled.div `
  display: flex;
  flex-wrap: wrap;
  width: 295px;
  padding-top: 2rem;
`;
const QuantityContainer = styled.div ``;
const SizeContainer = styled.div ``;
const DropDownListContainer = styled.div``;
const DropDownHeader = styled.button`
  padding: 1rem;
  margin: 0.5rem;
  padding-left: 1rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
`;
const AddtoCart = styled.button `
  padding: 1.5rem;
  margin: 0.5rem;
  padding-left: 2rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  width: 188px;
`;
const DropdownList = styled.div `
  padding: 1rem;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
`;
const DropdownOption = styled.select `
  list-style: none;
  margin-bottom: 0.8em;
`;

const ListItem = styled.option`
  list-style: none;
  margin-bottom: 0.8em;
`;

export default function StyleSelector() {
  const {stylesDataContent, currentStyleContent} = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const results = stylesData.results;
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isQuantOpen, setIsQuantOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantityOptions, setQuantityOptions] = useState(1);

  const sizes = () => {
    var sizeArray = [];
    Object.keys(currentStyle.skus).forEach((key => {
      sizeArray.push(key);
    }));
    return sizeArray;
  };
  //const stylesList = sizes();
  const sizeQuantity = () => {
    var obj = {};
    Object.values(currentStyle.skus).forEach((value => {
      if (!obj[value.size]) {
        obj[value.size] = value.quantity;
      } else {
        obj[value.size] = obj[value.size] + value.quantity;
      }
    }));
    return obj;
  };

  const onPhotoClick = (value) => {
    setCurrentStyle(value);
    setSelectedQuantity(1);
    setSelectedSize(null);
  };

  console.log('QUANTITY obj: ', sizeQuantity());
  //console.log('skus: ', currentStyle.skus);

  const uniqueSizes = () => {
    return Array.from(new Set(sizes().map((sku => currentStyle.skus[sku].size))));
  };
  //console.log('quantity ', currentStyle.skus);

  const togglingSize = () => setIsSizeOpen(!isSizeOpen);
  const togglingQuant = () => setIsQuantOpen(!isQuantOpen);

  const quantobj = sizeQuantity();

  const onSizeClicked = (e) => {
    setSelectedSize(e.target.innerHTML);
    setQuantityOptions(quantobj[e.target.innerHTML]);
    setIsSizeOpen(false);
  };
  const onQuantityClicked = (e) => {
    setSelectedQuantity(parseInt(e.target.innerHTML));
    setIsQuantOpen(false);
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


  const quantityAmount = quantityOptions;
  //console.log(quantityAmount);

  return (
    <div>
      <Price>{currentStyle.sale_price ? <><Sale> {currentStyle.sale_price}</Sale><OldPrice>{currentStyle.original_price}</OldPrice></> : currentStyle.original_price}</Price>
      <SelectedStyle>Selected Style: </SelectedStyle>
      <StyleName key={currentStyle.style_id}>{currentStyle.name}</StyleName>
      <StylePicsDiv>
        {results.map((photo) => {
          return (
            <Button onClick={() => onPhotoClick(photo)} key={photo.style_id}><StylePic src={photo.photos[0].thumbnail_url}></StylePic></Button>
          );
        })}
      </StylePicsDiv>
      <Dropdown>
        <div>
          <DropDownHeader onClick={togglingSize}>{!selectedSize ? 'Select A Size' : 'size: ' + selectedSize}</DropDownHeader>
          {isSizeOpen && (
            <DropDownListContainer>
              <DropdownList>
                {uniqueSizes().map(size => (
                  <ListItem onClick={(e) => onSizeClicked(e)} key={Math.random()}>
                    {size}
                  </ListItem>
                ))}
              </DropdownList>
            </DropDownListContainer>
          )}
        </div>
        <div>
          {selectedSize ?
            <DropDownHeader onClick={togglingQuant}>{!selectedQuantity ? 'Select Quantity' : 'Quantity: ' + selectedQuantity}</DropDownHeader>
            :
            <DropDownHeader>-</DropDownHeader>
          }
          {isQuantOpen && (
            <DropDownListContainer>
              <DropdownList>
                {quantityArr().map((num) => {
                  return <ListItem onClick={(e) => onQuantityClicked(e)} key={Math.random()}>{num}</ListItem>;
                })}
              </DropdownList>
            </DropDownListContainer>
          )}
        </div>
        <AddtoCart>Add to Cart</AddtoCart>
      </Dropdown>
      {/* <div>
        <img src={pinIcon}></img>
      </div> */}
    </div>
  );
}
