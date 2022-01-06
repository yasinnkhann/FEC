import React from 'react';
import ActionButton from '../ActionButton';
import {render, fireEvent, act} from '@testing-library/react';
import 'regenerator-runtime/runtime';

describe('Action Button', () => {
  it('displays star icon when name is \'open-modal\'', () => {
    const { getByTestId } = render(<ActionButton name='open-modal' />);
    const input = getByTestId('starsIcon');
    expect(input.type).toBe('svg');
    expect(input.elementType).toBe('svg');
  });

  it('displays an x icon when name is not \'open-modal\'', () => {
    const { getByTestId } = render(<ActionButton name='close-moda' />);
    const input = getByTestId('closeIcon');
    console.log(input.__reactFiber$qt2p8aep63);
    expect(input.type).toBe('svg');
    expect(input.elementType).toBe('svg');
  });
});