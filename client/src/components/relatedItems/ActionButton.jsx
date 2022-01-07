import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';
import styled from 'styled-components';
import ModalContext from './ModalContext.js';

// ACTION BUTTON
export default function ActionButton({ name }) {
  // JSX
  return <span className="action-button">{name === 'open-modal' ? <Symbol><StarsIcon dataid-test="starsIcon" /></Symbol> : <CloseIcon dataid-test="closeIcon" />}</span>;
}

const Symbol = styled.div`
  color: "B1A9AC";
`;