import React, {useContext, useState} from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';

// const ThumbsDiv = styled.div `
//   display: flex;
//   flex-wrap: wrap;
// `;
// const Thumb = styled.img `
//   flex: 1 0 calc(33% - 10px);
//   margin: 5px;
//   border-radius: 50%; 
//   height: 100px;
// `;

export default function Thumbnails() {
  const {stylesData, setStylesData} = useContext(StylesContext);
  //console.log('stylesData from thumbnails: ', stylesData.results);
  const results = stylesData.results;
  const defaultStyle = results.map((result) => {
    if (result['default?']) {
      return result;
    }
  });
  const [currentStyle, setCurrentStyle] = useState(defaultStyle);
  console.log(currentStyle);
  return (
    <div>
      <h3>Selected Style:</h3><p>{currentStyle[0].name}</p>
      <ImageGallery
        selected={currentStyle}
      />
    </div>
  );
}
// const photos = stylesData.results[0].photos;
// const thumbnailPhotos = () => {
//   let photosArray = [];
//   for (let i = 0; i < photos.length; i++) {
//     photosArray.push(photos[i].thumbnail_url);
//   }
//   return photosArray;
// };
 
// // var photo = photos.map((photo) => {
// //   console.log(photo.thumbnail_url);
// //   return photo.thumbnail_url;
// // });
// console.log('stylesData from thumbnails: ', stylesData.results);
// return (
//   <ThumbsDiv>
//     {thumbnailPhotos().map((photo) => {
//       return <Thumb key={photo.product_id} src = {photo}></Thumb>;
//     })}
//   </ThumbsDiv>
// );
