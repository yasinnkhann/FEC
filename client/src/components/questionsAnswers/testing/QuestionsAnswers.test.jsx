/**
 * @jest-environment jsdom
 */
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from '@testing-library/react';
import React from 'react';
import QuestionsAnswers from '../QuestionsAnswers';
import 'regenerator-runtime/runtime';
import { providerProps, customRender } from './dummyQuestions';

describe('QuestionsAnswers Component', () => {
  beforeEach(() => {
    customRender(<QuestionsAnswers {...providerProps} />);
  });
  test('Is Q&A title rendered', () => {
    screen.getByRole('');
    const { getByText } = render(<QuestionsAnswers />);
    const title = getByText(/Questions &#38; Answers/i);
    expect(title).toBeInTheDocument();
  });
});
