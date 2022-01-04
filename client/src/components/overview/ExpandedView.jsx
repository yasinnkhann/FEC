import React, {useEffect} from 'react';
import styled from 'styled-components';
import {PortalWithState} from 'react-portal';

const ModalContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ModalBody = styled.section `
  background-color: rgb(220, 245, 253);
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  overflow: auto;
  display: flex;
  justify-content: center;
`;
const ModalImg = styled.img `
  object-fit: cover;
`;


export default function CompareModal({ photo, open, close }) {
  useEffect(() => {
    const mainEl = document.querySelector('main');

    if (open) {
      if (mainEl) {
        mainEl.style.filter = 'blur(3px)';
      }
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (mainEl) {
        mainEl.style.filter = 'none';
      }
    };
  }, [open]);
  const renderPortal = ({ portal }) => {
    return portal(
      <div>
        <ModalContainer onClick={close}>
          <ModalBody><ModalImg src={photo}></ModalImg></ModalBody>
        </ModalContainer>
      </div>
    );
  };
  if (open) {
    return (
      <PortalWithState defaultOpen closeOnEsc onClose={close}>
        {renderPortal}
      </PortalWithState>
    );
  } else {
    return null;
  }
}

