import React from 'react';
import StylesContext from './StylesContext.js';
import styled from 'styled-components';

const ImgContainer = styled.div `
grid-column-start: 1;
grid-column-end: 2;
padding: 2rem;
max-height: 700px;
max-width: 500px;
margin-left: 6rem;
`;
const Image = styled.img `
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 2rem;
 position: relative;
`;
/* <ImgContainer>
<Image src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
</ImgContainer> */
export default function ImageGallery({selected}) {
  console.log('IMAGE GALLERY: ', selected);
  return (
    <ImgContainer>
      <Image src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
    </ImgContainer> 
  );
}