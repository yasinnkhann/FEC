/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddQuestion from '../AddQuestion';
import { product, questions } from './dummyQuestions';
import 'regenerator-runtime/runtime';

describe('Question Modal Component', () => {
  //   it('Rendered Modal', () => {
  //     render(<AddQuestion />);
  //     expect(screen.getByText('Submit a new question')).toBeInTheDocument();
  //   });
});
