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
  width: 50%;
  margin-top: 6rem;
  margin-bottom: 2rem;
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
  width: 4rem;
  height: 4rem;
  border-radius: 2.5rem;
  object-fit: cover;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  margin: 0 0.5rem;
`;
