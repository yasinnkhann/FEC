import React from 'react';
import ActionButton from '../ActionButton';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

it('displays star icon when name is open-modal', () => {
  const starButton = render(<ActionButton name='open-modal' />);

});