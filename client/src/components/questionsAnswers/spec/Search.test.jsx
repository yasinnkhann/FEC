/**
 * @jest-environment jsdom
 */
import { render, fireEvent, act } from '@testing-library/react';
import Search from '../Search';
import React from 'react';
import 'regenerator-runtime/runtime';

describe('Search Component', () => {
  it('Rendered Search Bar', () => {
    const { getByTestId } = render(<Search />);
    const input = getByTestId('searchBar');
    expect(input).toBeTruthy();
  });

  // it('Updates Search Query', async () => {
  //   await act(async () => {
  //     const { getByTestId } = render(<Search handleChange={() => 'test'} />);
  //     const input = getByTestId('searchBar');
  //     const inputWord = 'test';
  //     await fireEvent.change(input, { target: { value: inputWord } });
  //     expect(input.innerHTML).toBe('test');
  //   });
  // });
});
