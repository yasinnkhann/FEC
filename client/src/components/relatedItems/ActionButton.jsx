// Dependency imports
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';

// Context imports
import ModalContext from './ModalContext.js';

// ACTION BUTTON
export default function ActionButton({ name }) {
  // JSX
  return <span className="action-button">{name === 'open-modal' ? <StarsIcon /> : <CloseIcon />}</span>;
}
