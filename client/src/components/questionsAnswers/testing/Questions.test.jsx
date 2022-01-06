/**
 * @jest-environment jsdom
 */
import { render, fireEvent, act } from '@testing-library/react';
import Questions from '../Questions';
import React from 'react';
import 'regenerator-runtime/runtime';

describe('Questions Component', () => {
  it('Is there a submit new question btn', () => {
    render(<Questions />);
    expect(screen.getByText('Submit a new question')).toBeInTheDocument();
    screen.debug();
  });
});
