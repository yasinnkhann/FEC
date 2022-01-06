/**
 * @jest-environment jsdom
 */
import { render, fireEvent, act } from '@testing-library/react';
import Search from '../Search';
import React from 'react';
import 'regenerator-runtime/runtime';

describe('Search Component', () => {
  it('Rendered Input', () => {
    const { getByTestId } = render(<Search handleChange={true} />);
    const input = getByTestId('searchBar');
    expect(input.placeholder).toBe('Have a question? Search for answers…');
  });

  // it('Updates Search Query', async () => {
  //   await act(async () => {
  //     const { getByTestId } = render(
  //       <Search handleChange={e => e.target.value} />
  //     );
  //     const input = getByTestId('searchBar');
  //     const inputWord = 'test';
  //     await fireEvent.change(input, { target: { value: inputWord } });
  //     expect(input.innerHTML).toBe('test');
  //   });
  // });
});
