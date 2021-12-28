import React, {useContext} from 'react';
import StylesContext from './StylesContext.js';

export default function Thumbnails() {
  const {stylesData, setStylesData} = useContext(StylesContext);
  return (
    <div>
      {console.log('stylesData from thumbnails: ', {stylesData})}
    </div>
  );
}

