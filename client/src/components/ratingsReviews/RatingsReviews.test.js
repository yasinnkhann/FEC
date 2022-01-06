import { render, screen } from '@testing-library/react';
import RatingsReviews from './RatingsReviews.jsx';

test('Render rating and reviews link', () => {
  render(<RatingsReviews/>);
  const linkElement = screen.getByText(/RATINGS & REVIEWS/i);
  expect(linkElement).toBeInTheDocument();
});