/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';

import ReviewList from './reviewList/ReviewList.jsx';
import WriteReview from './writeReviews/WriteReview.jsx';
import RatingBreakdown from './ratingBreakdown/RatingBreakdown.jsx';
import ProductBreakdown from './productBreakdown/ProductBreakdown.jsx';
import SortOptions from './sortOptions/SortOption.jsx';

import metaDummy from './metaDummy.jsx';
import dummyDataReviews from './dummyDataReviews.jsx';

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

export default function RatingsReviews() {
  const { productsValue, selectedProductValue } = useContext(AppContext);
  const [products, setProducts] = productsValue;
  const [selectedProduct, setSelectedProduct] = selectedProductValue;

  const [reviewList, setReviewList] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [reviewEnd, setReviewEnd] = useState(2);
  const [starSort, setStarSort] = useState([]);
  const [listSort, setListSort] = useState(0);
  const [reviewReady, setReviewReady] = useState(false);
  const [writeReviewModal, setWriteReviewModal] = useState(false);
  const [noReviews, setNoReviews] = useState(false);
  const [hideMoreReviews, setHideMoreReviews] = useState(false);


  useEffect(() => {
    // const getReviewApi = async () => {
    //   try {
    //     const res = await axios.get(
    //       `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?count=50&product_id=${selectedProduct.id}`,
    //       {
    //         headers: {
    //           Authorization: `${TOKEN}`,
    //         },
    //       }
    //     );
    //     setReviewList(res.data.results);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

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
    // getReviewApi();
  }, []);

  // const handleReviewData = (reviewData) => {
  //   axios.post('/reviews', reviewData)
  //     .then((results) => {
  //     })
  //     .catch((err) => {
  //       console.log('err on review POST', err);
  //     });
  // };

  const listSortChange = (event) => {
    setListSort(event.target.value);
  };

  const sortByStar = (event) => {
    console.log(event);
    if (starSort.indexOf(event.target.id) === -1) {
      setStarSort([...starSort, event.target.id]);
    } else {
      starSort.splice(starSort.indexOf(event.target.id), 1);
      setStarSort({starSort});
    }
  };

  const clearStarFilter = () => {
    setStarSort([]);
  };

  return (
    <div>
      {/* <h3>RATINGS & REVIEWS</h3> */}
      {/* {console.log('from Product from APP:', products)} */}
      {/* {console.log('from selectedProduct from APP:', selectedProduct.id)} */}
      {/* {console.log('from reviewList API:', reviewList)} */}
      {/* {console.log('from dummyData:', dummyDataReviews)} */}
      {/* {console.log('from metaDummyData:', metaDummy)} */}
      {/* {console.log('from metaData:', metaData)} */}
      {/* {console.log(listSort)} */}
      {/* {console.log(starSort)} */}


      <div>
        {/* <div style={sortOptionsStyle}>
          <SortOptions
            metaData={metaDummy}
            listSort={listSort}
            listSortChange={listSortChange}
          />
        </div> */}
        {/* <RatingBreakdown reviewData={reviewList}/> */}
        <RatingBreakdown
          metaData={metaDummy}
          sortByStar={sortByStar}
          starSort={starSort}
          clearStarFilter={clearStarFilter}
        />
      </div>
      {/* <div style={productStyle}>
        <ProductBreakdown metaData={metaDummy} />
      </div> */}
      {/* <div>
        <WriteReview
          metaData={metaDummy}
          handleReviewData={handleReviewData()}
          product_id={product_id}
        />
      </div> */}
      {/* <div style={productStyle}>
        <SortOptions metaData={metaData} />
      </div>
      <div style={productStyle}>
        <ReviewList metaData={metaData} />
      </div> */}

    </div>
  );
}

//======================Practice Code ========================

// /* eslint-disable camelcase */
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// import AppContext from '../../AppContext.js';
// import { TOKEN } from '../../config.js';

// import ReviewList from './reviewList/ReviewList.jsx';
// import WriteReview from './writeReviews/WriteReview.jsx';
// import RatingBreakdown from './ratingBreakdown/RatingBreakdown.jsx';
// import ProductBreakdown from './productBreakdown/ProductBreakdown.jsx';
// import SortOptions from './sortOptions/SortOption.jsx';

// export default function RatingsReviews() {
//   const { products, setProducts } = useContext(AppContext);
//   const [reviewList, setreviewList] = useState([]);
//   const [reviewList, setReviewList] = useState([]);
//   const [noReviews, setNoReviews] = useState(true);
//   // const [counter, setCounter] = useState(0);
//   const [inputValue, setInputValue] = useState('Hatha');
//   const [showText, setShowText] = useState(true);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const getApi = async () => {
//       try {
//         const res = await axios.get(
//           // `/reviews/?product_id=${productID}&count=4`
//           'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/',
//           {
//             params: {
//               // page: 1,
//               count: 50,
//               // sort: 'newest',
//               product_id: 40344
//               // TODO: ${productID} need to pass in dynamically for now just sure dummy data
//             },
//             headers: {
//               Authorization: `${TOKEN}`,
//             }
//           }
//         );
//         // console.log('Rate and Review API Data:', res.data);
//         setreviewList(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getApi();
//   }, []);

//   // const increment = () => {
//   //   setCounter(counter + 1);
//   // };

//   let onChange = (event) => {
//     const newValue = event.target.value;
//     setInputValue(newValue);

//   };

//   return (
//     <div>
//       <h3>Hello from the section of ratings and reviews!</h3>
//       {/* {console.log('from Product from APP:', products[0]?.id)} */}
//       {/* {console.log('from reviewList:', reviewList)} */}
//       {/* <div>
//         {counter}
//         <button onClick={increment}>Increment</button>
//       </div> */}
//       <div>
//         <input placeholder="Enter sth here..." onChange={onChange}/>
//         {inputValue}
//       </div>
//       <div>
//         <h1>{count}</h1>
//         <button
//           onClick={() => {
//             setCount(count + 1);
//             setShowText(!showText);
//           }}
//         >
//           Click Here
//         </button>
//         {showText && <p>This is a text</p>}
//       </div>
//     </div>
//   );
// }

//======================Practice Code ========================
// class RatingsReviews extends React.Component {
//   constructor(props) {
//     super(props);
//     const { metaData } = this.props;
//     this.state = {
//       reviewList: [],
//       metaData,
//       reviewEnd: 2,
//       starSort: [],
//       listSort: 0,
//       reviewsReady: false,
//       writeReviewModal: false,
//       noReviews: false,
//       hideMoreReviews: false,
//     };
//   }

//   componentDidMount() {
//     /// /GET product reviews/////
//     const { productID } = this.props;

//     axios.get(`/reviews/?product_id=${productID}&count=4`)
//       .then((results) => {
//         if (results.data.results.length === 0) {
//           this.setState({
//             noReviews: true,
//           });
//         }
//         this.setState({
//           reviewList: results.data.results,
//           reviewsReady: true,
//         });
//       })
//       .catch((err) => {
//         console.log('error on review GET request', err);
//       });

//     axios.get(`/reviews/?product_id=${productID}&count=1000`)
//       .then((results) => {
//         reviewCache.reviewCache.push(results.data);
//       })
//       .catch((err) => {
//         console.log('err on 1000 get', err);
//       });
//   }

//   handleReviewData(reviewData) {
//     axios.post('/reviews', reviewData)
//       .then((results) => {
//       })
//       .catch((err) => {
//         console.log('err on review POST', err);
//       });
//   }

//   handlePut(review_id, type) {
//     axios.put(`/reviews/${review_id}/${type}`)
//       .then((results) => {
//       })
//       .catch((err) => {
//         console.log(err.data);
//       });
//   }

//   exitWriteReviewClick() {
//     this.setState({
//       writeReviewModal: false,
//     });
//   }

//   writeReviewClick(e) {
//     this.setState({
//       writeReviewModal: true,
//     });
//   }

//   render() {
//     const {
//       noReviews, metaData, writeReviewModal,
//       reviewsReady, reviewList, listSort, reviewEnd, hideMoreReviews, starSort,
//     } = this.state;

//     const { productID, reviewCacheState } = this.props;
//     return (
//       <div>
//         <div>Be the first to write a review!</div>
//         <button
//           className="addReview"
//           type="button"
//           onClick={this.writeReviewClick}
//         >
//             ADD A REVIEW +
//         </button>
//         {
//           writeReviewModal
//           && (
//             <div role="button" onClick={this.exitWriteReviewClick} >
//               <div onClick={(e) => e.stopPropagation()}>
//                 <WriteReview
//                   handleReviewData={this.handleReviewData}
//                   productID={productID}
//                   metaData={metaData}
//                 />
//                 <br/>
//               </div>
//             </div>
//           )
//         }
//       </div>
//     );
//   }
// }

// export default RatingsReviews;
