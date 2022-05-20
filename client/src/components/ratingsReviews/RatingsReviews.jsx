import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import ReviewsContext from './RatingsContext.js';
import { serverURL } from '../../config.js';
import { cloudinaryInfo } from '../../config.js';

const ReviewList = lazy(() => import('./reviewList/ReviewList.jsx'));
const WriteReview = lazy(() => import('./writeReviews/WriteReview.jsx'));
const RatingBreakdown = lazy(() =>
  import('./ratingBreakdown/RatingBreakdown.jsx')
);
const ProductBreakdown = lazy(() =>
  import('./productBreakdown/ProductBreakdown.jsx')
);
const SortOptions = lazy(() => import('./sortOptions/SortOption.jsx'));

export default function RatingsReviews() {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);
  const [products, setProducts] = productsContext;
  const [selectedProduct, setSelectedProduct] = selectedProductContext;

  // STATE
  const [reviewList, setReviewList] = useState({});
  const [filteredReviewList, setFilteredReviewList] = useState({});
  const [metaData, setMetaData] = useState([]);
  const [reviewEnd, setReviewEnd] = useState(2);
  const [starSort, setStarSort] = useState([]);
  const [listSort, setListSort] = useState('1');
  const [reviewsReady, setReviewReady] = useState(false);
  const [writeReviewModal, setWriteReviewModal] = useState(false);
  const [noReviews, setNoReviews] = useState(false);
  const [hideMoreReviews, setHideMoreReviews] = useState(false);
  const [reviewCache, setReviewCache] = useState([]);
  const [reviewCacheState, setReviewCacheState] = useState(0);
  const [isReviewLoaded, setIsReviewLoaded] = useState(false);
  const [isMetaDataLoaded, setIsMetaDataLoaded] = useState(false);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [isPostReqPending, setIsPostReqPending] = useState(false);

  const getReviewApi = async () => {
    try {
      const res = await axios.get(`${serverURL}/reviews`, {
        params: {
          count: 1000,
          product_id: selectedProduct.id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setReviewList(res.data);
      setFilteredReviewList(res.data);
      setIsReviewLoaded(true);
      setReviewReady(true);

      if (res.data.results.length === 0) {
        setNoReviews(true);
      }
      reviewCache.push(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMetaApi = async () => {
    try {
      const res = await axios.get(`${serverURL}/reviews/meta`, {
        params: {
          count: 50,
          product_id: selectedProduct.id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMetaData(res.data);
      setIsMetaDataLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMetaApi();
    getReviewApi();
  }, [selectedProduct]);

  const listSortChange = e => {
    setListSort(e.target.value);

    if (e.target.value === '1') {
      setFilteredReviewList(reviewList);
    }

    if (e.target.value === '2') {
      const resultsCopy = [...reviewList.results];
      const mostHelpfulReviews = resultsCopy.sort(
        (a, b) => b.helpfulness - a.helpfulness
      );
      setFilteredReviewList(currReviewsList => ({
        ...currReviewsList,
        results: mostHelpfulReviews,
      }));
    }

    if (e.target.value === '3') {
      const resultsCopy = [...reviewList.results];
      const mostRecentReviews = resultsCopy.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setFilteredReviewList(currReviewsList => ({
        ...currReviewsList,
        results: mostRecentReviews,
      }));
    }
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        exitWriteReviewClick();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleSortByStar = rating => {
    const filteredReviews = reviewList.results.filter(
      review => review.rating === Number(rating)
    );
    setFilteredReviewList(currReviewList => ({
      ...currReviewList,
      results: filteredReviews,
    }));
    setShowClearFilter(true);
  };

  const clearStarFilter = () => {
    setFilteredReviewList(reviewList);
    setShowClearFilter(false);
  };

  const handleReviewData = async reviewData => {
    const photoURLs = [];
    for (let i = 0; i < reviewData.photos.length; i++) {
      const formData = new FormData();
      formData.append('file', reviewData.photos[i]);
      formData.append('upload_preset', cloudinaryInfo.CLOUDINARY_UPLOAD_PRESET);
      try {
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryInfo.CLOUDINARY_NAME}/image/upload`,
          formData
        );
        console.log('UPLOAD RES: ', uploadRes);
        photoURLs.push(uploadRes.data.secure_url);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const body = {
        product_id: reviewData.product_id,
        body: reviewData.body,
        summary: reviewData.summary,
        name: reviewData.name,
        email: reviewData.email,
        recommend: reviewData.recommend,
        rating: reviewData.rating,
        photos: photoURLs,
        characteristics: reviewData.characteristics,
      };
      const res = await axios.post(`${serverURL}/reviews`, body, {
        params: {
          product_id: selectedProduct.id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Add Review POST Success!! :: ', res);
      handlePostReqPending(false);
      exitWriteReviewClick();
    } catch (err) {
      console.log('err on review POST:: ', err);
    }
  };

  const moreReviewsClick = () => {
    const newEnd = reviewEnd + 2;
    if (newEnd > reviewList.results.length - 1) {
      setHideMoreReviews(true);
    } else {
      setReviewEnd(newEnd);
    }
  };

  const exitWriteReviewClick = () => {
    setWriteReviewModal(false);
  };

  const writeReviewClick = () => {
    setWriteReviewModal(true);
  };

  const handlePostReqPending = bool => {
    setIsPostReqPending(bool);
  };

  if (noReviews) {
    return (
      <NoReviewsGrid id='ratings-reviews'>
        <div
          style={{
            textAlign: 'center',
            fontSize: '30px',
            gridRow: '1',
            color: '#B1A9AC',
          }}
        >
          No review for this product Be the first to add one!
        </div>
        <AddReviewBtn
          className='addReview'
          type='button'
          onClick={writeReviewClick}
        >
          ADD A REVIEW +
        </AddReviewBtn>
        {writeReviewModal && (
          <ModalStyle
            aria-hidden='true'
            role='button'
            onClick={exitWriteReviewClick}
          >
            <InnerModal aria-hidden='true' onClick={e => e.stopPropagation()}>
              <Suspense fallback={<div>Loading...</div>}>
                <WriteReview
                  handleReviewData={handleReviewData}
                  productID={selectedProduct.id}
                  metaData={metaData}
                />
              </Suspense>
              <br />
            </InnerModal>
          </ModalStyle>
        )}
      </NoReviewsGrid>
    );
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviewList,
        setReviewList,
        metaData,
        setMetaData,
        showClearFilter,
      }}
    >
      <MainContainer id='ratings-reviews'>
        <Header>Ratings &#38; Reviews</Header>
        {isMetaDataLoaded && isReviewLoaded && (
          <MainDiv>
            {reviewsReady === true && (
              <>
                <AvgRatingContainer>
                  <Suspense fallback={<div>Loading...</div>}>
                    <RatingBreakdown
                      metaData={metaData}
                      sortByStar={handleSortByStar}
                      clearStarFilter={clearStarFilter}
                    />
                  </Suspense>
                </AvgRatingContainer>
                <ReviewBreakdownContainer>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductBreakdown metaData={metaData} />
                  </Suspense>
                </ReviewBreakdownContainer>
                {writeReviewModal && (
                  <ModalStyle
                    aria-hidden='true'
                    role='button'
                    onClick={exitWriteReviewClick}
                  >
                    <InnerModal
                      aria-hidden='true'
                      onClick={e => e.stopPropagation()}
                    >
                      <Suspense fallback={<div>Loading...</div>}>
                        <WriteReview
                          reviewData={handleReviewData}
                          productID={selectedProduct.id}
                          metaData={metaData}
                          isPostReqPending={isPostReqPending}
                          handlePostReqPending={handlePostReqPending}
                        />
                      </Suspense>
                      <br />
                    </InnerModal>
                  </ModalStyle>
                )}
                <ReviewListContainer>
                  <SortOptionsContainer>
                    <Suspense fallback={<div>Loading...</div>}>
                      <SortOptions
                        metaData={metaData}
                        listSortChange={listSortChange}
                      />
                    </Suspense>
                  </SortOptionsContainer>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReviewList
                      reviewCache={reviewCache}
                      reviewCacheState={reviewCacheState}
                      starSort={starSort}
                      filteredReviewList={filteredReviewList}
                      reviewEnd={reviewEnd}
                    />
                  </Suspense>
                </ReviewListContainer>
                <ReviewBtnsContainer>
                  {reviewList.results.length > 2 && hideMoreReviews === false && (
                    <MoreReviewsBtn
                      className='moreReviews'
                      type='button'
                      onClick={moreReviewsClick}
                    >
                      MORE REVIEWS
                    </MoreReviewsBtn>
                  )}
                  <AddReviewBtn
                    id='addReview'
                    type='button'
                    onClick={writeReviewClick}
                  >
                    ADD A REVIEW +
                  </AddReviewBtn>
                </ReviewBtnsContainer>
              </>
            )}
          </MainDiv>
        )}
      </MainContainer>
    </ReviewsContext.Provider>
  );
}

const MainContainer = styled.div``;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 33% 66%;
  grid-template-rows: 20rem 1fr;
  color: #fdf0d5;
`;

const NoReviewsGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const AvgRatingContainer = styled.div``;

const Header = styled.h3`
  font-size: xx-large;
  text-align: center;
  padding-bottom: 1rem;
  font-family: 'Lobster Two', cursive;
  color: #fdf0d5;
`;

const AddReviewBtn = styled.button`
  border: none;
  color: black;
  padding: 0.625rem 1.25rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.25rem 0.125px;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.625rem;
  background-color: floralwhite;
  color: #38062b;
  margin-bottom: 1.875rem;
  outline: none;
`;

const MoreReviewsBtn = styled.button`
  border: none;
  color: black;
  padding: 0.625rem 1.25rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.25rem 0.125px;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.625rem;
  background-color: floralwhite;
  color: #38062b;
  margin-bottom: 1.875rem;
  outline: none;
`;

const ModalStyle = styled.div`
  backdrop-filter: blur(8px) contrast(70%);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 150;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  padding-top: 80px;
`;

const InnerModal = styled.div`
  background-color: #fdf0d5;
  color: #38062b;
  width: 50%;
  min-width: 36rem;
  max-width: 100%;
  max-height: 80%;
  margin: auto;
  padding: 0.5rem;
  border: none;
  overflow: auto;
  border-radius: 20px;
`;

const ReviewBreakdownContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  padding: 0 5rem;
`;

const SortOptionsContainer = styled.div`
  grid-column: 2 / -1;
  grid-row: 1;
  font-weight: bold;
  font-style: italic;
  text-align: end;
  margin-right: 1rem;
`;

const ReviewListContainer = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / -1;
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: #fdf0d5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 10px;
  }
`;

const ReviewBtnsContainer = styled.div`
  width: 100%;
  grid-column: 2 / -1;
  display: flex;
  justify-content: space-evenly;
`;
