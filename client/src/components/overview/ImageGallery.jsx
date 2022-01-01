import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import StylesContext from './StylesContext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const MainImgContainer = styled.div `
position: relative;
grid-column-start: 1;
grid-column-end: 2;
height: 650px;
width: 600px;
`;
const MainImage = styled.img `
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 2rem;
 position: relative;
`;

const ThumbnailContainer = styled.div `
z-index: 1;
height: 50px;
width: 50px;
position: absolute;
left: 20px;
top: 20px;
`;

const ThumbnailImage = styled.img `
border: ${props => props.selected ? '3px solid black' : null};
width: 100%;
height: 100%;
object-fit: cover;
margin-bottom: 10px;
`;

export default function ImageGallery() {
  const {stylesDataContent, currentStyleContent} = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  // const [currentPhoto, setcurrentPhoto] = useState(currentStyle.photos[index].url);
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    setcurrentIndex(0);
  }, [currentStyle]);
  //console.log(currentStyle);
  const renderPhoto = () => {
    return currentStyle.photos.map((photo, index) => {
      return <ThumbnailImage selected={currentStyle.photos[currentIndex].thumbnail_url === photo.thumbnail_url} src={photo.thumbnail_url} key={photo.thumbnail_url} onClick={() => setcurrentIndex(index)}></ThumbnailImage>;
    });
  };

  return (
    <MainImgContainer>
      <ThumbnailContainer>
        {renderPhoto()}
      </ThumbnailContainer>
      <ChevronLeftIcon></ChevronLeftIcon>
      <MainImage src={currentStyle.photos[currentIndex].url}></MainImage>
    </MainImgContainer>
  );
}