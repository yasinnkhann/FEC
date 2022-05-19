import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function PhotoMapEntry({ photo: { url } }) {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setExpand(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <ImgContainer>
      {expand === true && (
        <ModalOverlay
          aria-hidden='true'
          onClick={() => {
            setExpand(false);
          }}
        >
          <ExpandedImg src={url} alt='' />
        </ModalOverlay>
      )}
      <Img
        src={url}
        alt=''
        aria-hidden='true'
        loading='lazy'
        onClick={() => {
          setExpand(true);
        }}
      />
    </ImgContainer>
  );
}

const ExpandedImg = styled.img`
  border-radius: 10px;
  max-height: 600px;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  display: flex;
  backdrop-filter: blur(8px) contrast(70%);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 150;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  overflow: hidden;
  margin: auto;
`;

const Img = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 40px;
  object-fit: cover;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 4px;
  cursor: pointer;
`;

const ImgContainer = styled.div``;
