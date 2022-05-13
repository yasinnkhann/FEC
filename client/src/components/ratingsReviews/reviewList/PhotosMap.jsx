import React from 'react';
import PhotoMapEntry from './PhotoMapEntry.jsx';

const PhotosMap = ({ photos }) => (
  <div>
    <div style={{ display: 'flex' }}>
      {photos.map(photo => (
        <PhotoMapEntry photo={photo} key={photo.id} />
      ))}
    </div>
  </div>
);

export default PhotosMap;
