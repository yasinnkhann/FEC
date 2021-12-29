import React, {useContext, useState} from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';
import { Photo } from '@material-ui/icons';

const ThumbsDiv = styled.div `
  display: flex;
  flex-wrap: wrap;
  width: 295px;
  border: 1px solid;
`;
const Thumb = styled.img `
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
export default function StyleSelector() {
  const {stylesDataContent, currentStyleContent} = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const results = stylesData.results;
  //console.log(results);


  //console.log('CURRENT STYLE: ', currentStyle);

  return (
    <div>
      <Price>{currentStyle.sale_price ? <><Sale> {currentStyle.sale_price}</Sale><OldPrice>{currentStyle.original_price}</OldPrice></> : currentStyle.original_price}</Price>
      <SelectedStyle>Selected Style: </SelectedStyle>
      <StyleName key={currentStyle.style_id}>{currentStyle.name}</StyleName>
      <ThumbsDiv>
        {results.map((photo) => {
          //console.log('PHOTO: ', photo);
          return (
            <Button onClick={() => {
              setCurrentStyle(photo);
            }}key={photo.style_id}><Thumb src={photo.photos[0].thumbnail_url}></Thumb></Button>
          );
        })}
      </ThumbsDiv>
    </div>
  );
}


// const defaultStyle = results.map((result) => {
//   if (result['default?']) {
//     return result;
//   }
// });