import React, { useState, useContext, lazy, Suspense } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { serverURL } from '../../../config.js';
import ReviewsContext from '../RatingsContext.js';

const PhotosMap = lazy(() => import('./PhotosMap.jsx'));

export default function ReviewListEntry({ review }) {
  // CONTEXT
  const { reviewList, setReviewList } = useContext(ReviewsContext);

  // STATE
  const [reviewMarkedHelpful, setReviewMarkedHelpful] = useState(false);
  const [reviewMarkedReported, setReviewMarkedReported] = useState(false);

  const handlePutEntryHelpful = async () => {
    const body = {};
    const review_id = review.review_id;
    if (!reviewMarkedHelpful) {
      try {
        await axios.put(`${serverURL}/reviews/helpful`, body, {
          params: {
            review_id: review_id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const reviewListCopy = Object.assign({}, reviewList);
        const modifiedReview = reviewListCopy.results.find(
          review => review.review_id === review_id
        );
        modifiedReview.helpfulness += 1;
        setReviewList(reviewListCopy);
        setReviewMarkedHelpful(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlePutEntryReported = async () => {
    const body = {};
    const review_id = review.review_id;
    if (!reviewMarkedReported) {
      try {
        await axios.put(`${serverURL}/reviews/report`, body, {
          params: {
            review_id: review_id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setReviewMarkedReported(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Review>
      <TopLine>
        <StarsContainer>
          <Rating
            name='read-only'
            value={review.rating}
            precision={0.25}
            max={5}
            size='small'
            readOnly
          />
        </StarsContainer>
        <NameAndDateContainer>
          <Name>{`${review.reviewer_name},`}</Name>
          <TheDate>
            {new Date(review.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </TheDate>
        </NameAndDateContainer>
      </TopLine>

      {review.summary && <Summary>{review.summary}</Summary>}
      <Body>{review.body}</Body>
      {review.response && (
        <SellerContainer>
          <strong>Seller: </strong>
          <SellerRes>{review.response}</SellerRes>
        </SellerContainer>
      )}
      {review.recommend === true && (
        <Recommended>✓ I recommend this product</Recommended>
      )}
      {review.photos.length > 0 && (
        <PhotosContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <PhotosMap photos={review.photos} />
          </Suspense>
        </PhotosContainer>
      )}
      <PutOptionsContainer>
        <Helpful>Helpful?</Helpful>{' '}
        <Yes onClick={handlePutEntryHelpful} aria-hidden='true'>
          Yes
        </Yes>{' '}
        <YesCount>{`(${review.helpfulness})`}</YesCount>
        {' | '}
        <Report onClick={handlePutEntryReported} aria-hidden='true'>
          {reviewMarkedReported ? 'Reported' : 'Report'}
        </Report>
      </PutOptionsContainer>
    </Review>
  );
}

const Review = styled.li`
  border-bottom: 2px solid lightcyan;
  padding-right: 1.5rem;
`;

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StarsContainer = styled.div``;

const NameAndDateContainer = styled.div`
  display: flex;
  font-size: 0.9rem;
`;

const Name = styled.p`
  color: yellow;
`;

const TheDate = styled.p`
  margin-left: 0.5rem;
`;

const PutOptionsContainer = styled.div`
  margin: 0.5rem 0;
  font-size: 0.8rem;
  text-align: right;
  word-spacing: 0.1rem;
`;

const Helpful = styled.span``;

const Yes = styled.u`
  color: limegreen;
  cursor: pointer;
`;

const YesCount = styled.span``;

const Report = styled.u`
  color: red;
  cursor: pointer;
`;

const Summary = styled.h4``;

const Body = styled.p`
  font-size: 0.8rem;
`;

const SellerContainer = styled.div``;

const SellerRes = styled.p``;

const Recommended = styled.p`
  color: greenyellow;
  font-size: 0.8rem;
`;

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
