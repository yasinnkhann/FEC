import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

export default function App() {
  return (
    <div>
      <ProductDetail />
      <QuestionsAnswers />
      <RatingsReviews />
      <RelatedItems />
    </div>
  );
}
