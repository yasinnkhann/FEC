import React from 'react';

const ImageList = ({imageData}) => {
  console.log(imageData);
  const mappedImages = imageData.map((photo) => {
    return <img key={photo.id} src={photo.url} alt="No images"/>;
  });
  return <div> ImageList: {mappedImages}</div>;
};

export default ImageList;