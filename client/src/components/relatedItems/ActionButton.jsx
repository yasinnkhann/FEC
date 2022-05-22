import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';
import styled from 'styled-components';

// ACTION BUTTON
export default function ActionButton({ name }) {
  // JSX
  return (
    <XIcon
      className='action-button'
      style={
        name === 'open-modal' ? { color: '#b1a8ac' } : { color: '#37062a' }
      }
    >
      {name === 'open-modal' ? (
        <Symbol>
          <StarsIcon dataid-test='starsIcon' />
        </Symbol>
      ) : (
        <CloseIcon dataid-test='closeIcon' />
      )}
    </XIcon>
  );
}

const Symbol = styled.div`
  color: 'B1A9AC';
`;

const XIcon = styled.span`
  cursor: pointer;
`;
