import React, { useState, useEffect, useContext, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';

import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';

import ReviewList from './reviewList/ReviewList.jsx';
import WriteReview from './writeReviews/WriteReview.jsx';
import RatingBreakdown from './ratingBreakdown/RatingBreakdown.jsx';
import ProductBreakdown from './productBreakdown/ProductBreakdown.jsx';
import SortOptions from './sortOptions/SortOption.jsx';

// import './ratingsReviewsStyles.css';
// import metaDummy from './metaDummy.jsx';
// import dummyDataReviews from './dummyDataReviews.jsx';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'minmax(5, 1fr) 200px',
  gridGap: '10px',
};

const noReviewsGrid = {
  display: 'grid',
  justifyContent: 'center',
  gridGap: '20px',
  paddingTop: '30px',
  paddingBottom: '30px',
};

const mainDiv = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '100%',
  maxWidth: '100%',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 'auto',

  fontFamily: 'Open Sans, sans-serif, Arial',
  scrollBehavior: 'smooth',
  // overflowScrolling: 'touch',
  // WebkitOverflowScrolling: 'touch',
  // '::WebkitScrollbar': { display: 'none' },
};

const ratingGrid = {
  gridColumn: '1',
  gridRow: '1',
  maxheight: '200px',
};

const addReviewBtnStyle = {
  // border: '1px solid grey',
  // boxShadow: '2px 2px 4px grey',
  // backgroundColor: 'white',
  // padding: '10px',
  // margin: 'auto',
  // width: 'auto',
  // maxWidth: '300px',
  // minWidth: '150px',
  // borderRadius: '16px',
  backgroundColor: '#ddd',
  border: 'none',
  color: 'black',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '16px',
  boxShadow: '0px 4px 8px 0px #0afa0a33',
  padding: '10px',
};

// const noReviewsAddBtn = {
//   border: '1px solid grey',
//   boxShadow: '2px 2px 4px grey',
//   backgroundColor: 'white',
//   padding: '10px',
//   width: '300px',
//   margin: 'auto',
//   gridRow: '2',
// };

const moreReviewsBtn = {
  // border: '1px solid grey',
  // width: '150px',
  // boxShadow: '2px 2px 4px grey',
  // backgroundColor: 'white',
  // padding: '10px',
  backgroundColor: '#ddd',
  border: 'none',
  color: 'black',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '16px',
  boxShadow: '0px 4px 8px 0px #0afa0a33',
  padding: '10px',
};

const modalStyle = {
  backdropFilter: 'blur(8px) contrast(70%)',
  backgroundColor: 'rgb(0,0,0)',
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: '150',
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
  overflow: 'hidden',
  paddingTop: '80px',
};

const innerModalStyle = {
  backgroundColor: 'white',
  width: '50%',
  minWidth: '580px',
  maxWidth: '100%',
  maxHeight: '80%',
  height: '80%',
  margin: 'auto',
  padding: '10px',
  border: 'none',
  overflow: 'auto',
  borderRadius: '20px',
};

const productStyle = {
  maxWidth: '100%',
  margin: 'auto',
  gridColumn: '1',
  gridRow: '2',
};

const sortOptionsStyle = {
  marginLeft: '30px',
  gridColumn: '2/-1',
  gridRow: '1',
};

const reviewListStyle = {
  gridColumn: '2/-1',
  gridRow: '1/5',
  overflow: 'auto',
  maxWidth: '90%',
  maxHeight: '520px',
  marginTop: '40px',
  marginBottom: '20px',
  marginLeft: '20px',
  listStyle: 'none',
};

const reviewButtonsStyle = {
  width: '100%',
  marginTop: '10px',
  gridColumn: '2/-1',
  gridRowEnd: '5',
};

export default function RatingsReviews() {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);
  const [products, setProducts] = productsContext;
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  // STATE
  const [reviewList, setReviewList] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [reviewEnd, setReviewEnd] = useState(2);
  const [starSort, setStarSort] = useState([]);
  const [listSort, setListSort] = useState(0);
  const [reviewsReady, setReviewReady] = useState(false);
  const [writeReviewModal, setWriteReviewModal] = useState(false);
  const [noReviews, setNoReviews] = useState(false);
  const [hideMoreReviews, setHideMoreReviews] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [reviewCache, setReviewCache] = useState([]);
  const [reviewCacheState, setReviewCacheState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 700);
    // get review api data
    const getReviewApi = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?count=1000&product_id=${selectedProduct.id}`,
          {
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        // console.log(res.data.results);
        setReviewList(res.data);
        setReviewReady(true);

        if (res.data.results.length === 0) {
          setNoReviews(true);
        }
        reviewCache.push(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    //get meta data
    const getMetaApi = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?count=50&product_id=${selectedProduct.id}`,
          {
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        // console.log(res.data);
        setMetaData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getMetaApi();
    getReviewApi();

    // append font awesome to index.html
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/1f15c8017d.js';
    script.crossorigin = 'anonymous';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };

  }, []);

  const listSortChange = (event) => {
    setListSort(event.target.value);
  };

  const sortByStar = (event) => {
    if (starSort.indexOf(event.target.id) === -1) {
      setStarSort([...starSort, event.target.id]);
    } else {
      starSort.splice(starSort.indexOf(event.target.id), 1);
      setStarSort({ starSort });
    }
  };

  const clearStarFilter = () => {
    setStarSort([]);
  };

  const handleReviewData = (reviewData) => {
    axios
      .post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', reviewData)
      .then((results) => {})
      .catch((err) => {
        console.log('err on review POST', err);
      });
  };

  const handlePut = (review_id, type) => {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review_id}/${type}`)
      .then((results) => {})
      .catch((err) => {
        console.log(err.data);
      });
  };

  const moreReviewsClick = () => {
    const newEnd = reviewEnd + 2;
    if (newEnd > reviewList.results.length) {
      setHideMoreReviews(true);
    }
    if (newEnd === reviewList.results.length - 1 || newEnd === reviewList.results.length) {
      setReviewList(reviewCache[reviewCacheState].results.slice(0, newEnd + 20));
      setReviewEnd(newEnd);
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

  if (noReviews) {
    return (
      <div style={noReviewsGrid}>
        <div style={{ textAlign: 'center', fontSize: '30px', gridRow: '1' }}>
          No review for this product Be the first to add one!
        </div>
        <button className="addReview" type="button" onClick={writeReviewClick} style={addReviewBtnStyle}>
          ADD A REVIEW +
        </button>
        {writeReviewModal && (
          <div style={modalStyle} aria-hidden="true" role="button" onClick={exitWriteReviewClick}>
            <div style={innerModalStyle} aria-hidden="true" onClick={(e) => e.stopPropagation()}>
              <WriteReview handleReviewData={handleReviewData} productID={selectedProduct} metaData={metaData} />
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Fragment>
      {isLoaded ? (
        <div style = {mainDiv}>
          {/* {console.log('from reviewList:', reviewList)} */}
          {/* {console.log('from metaData:', metaData)} */}
          {/* {console.log('selectedProduct:: ', selectedProduct)} */}
          {/* {console.log('review CacheData:: ', reviewCache)} */}
          {/* {console.log('reviewCacheState: ', reviewCacheState)} */}
          {/* {console.log('listSort:: ', listSort)}  */}

          {reviewsReady === true && (
            <div style={gridLayout}>
              <div style={ratingGrid}>
                <RatingBreakdown
                  metaData={metaData}
                  sortByStar={sortByStar}
                  starSort={starSort}
                  clearStarFilter={clearStarFilter}
                />
              </div>
              <div style={productStyle}>
                <ProductBreakdown metaData={metaData} />
              </div>
              {writeReviewModal && (
                <div
                  style={modalStyle}
                  aria-hidden="true"
                  role="button"
                  onClick={exitWriteReviewClick}
                >
                  <div
                    style={innerModalStyle}
                    aria-hidden="true"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WriteReview
                      handleReviewData={handleReviewData}
                      productID={selectedProduct}
                      metaData={metaData}
                    />
                    <br />
                  </div>
                </div>
              )}
              <div style={sortOptionsStyle}>
                <SortOptions metaData={metaData} listSort={listSort} listSortChange={listSortChange} />
              </div>
              <div style={reviewListStyle}>
                <ReviewList
                  reviewCache={reviewCache}
                  reviewCacheState={reviewCacheState}
                  starSort={starSort}
                  reviewList={reviewList}
                  reviewEnd={reviewEnd}
                  handlePut={handlePut}
                />
              </div>
              <div style={reviewButtonsStyle}>
                <div style={{ display: 'flex', marginTop: '90px', justifyContent: 'space-evenly' }}>
                  {reviewList.results.length > 2 && hideMoreReviews === false && (
                    <button className="moreReviews" type="button" style={moreReviewsBtn} onClick={moreReviewsClick}>
                      MORE REVIEWS
                    </button>
                  )}
                  <button id="addReview" type="button" onClick={writeReviewClick} style={addReviewBtnStyle}>
                    ADD A REVIEW +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader type="Oval" color="green" height={160} width={160} arialLabel="loading-indicator" />
      )}
    </Fragment>
  );
}
