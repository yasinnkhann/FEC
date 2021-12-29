import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import StylesContext from './StylesContext';

const ImgContainer = styled.div `
grid-column-start: 1;
grid-column-end: 2;
padding: 2rem;
max-height: 700px;
max-width: 500px;
margin-left: 3rem;
`;
const Image = styled.img `
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 2rem;
 position: relative;
`;
export default function ImageGallery() {
  const {stylesDataContent, currentStyleContent} = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  return (
    <ImgContainer>
      <Image src={currentStyle.photos[0].url}></Image>
    </ImgContainer>
  );
}