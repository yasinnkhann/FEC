import React from 'react';
import styled from 'styled-components';
import PhotoMapEntry from './PhotoMapEntry.jsx';

const imgContainer = {
  display: 'flex',
};

const PhotosMap = ({ photos }) => (
  <div>
    <div style={imgContainer}>
      {photos.map((photo) => (
        <PhotoMapEntry photo={photo} key={photo.id} />
      ))}
    </div>
  </div>
);

export default PhotosMap;
