// import React from 'react';
// import styled from 'styled-components';



// const ReviewList = () => (<div>{props.item}</div>);

// export default function Reviews(props) {
//   // const mappedReviews = dummyDataReviews.result.map((review, indx) => <ReviewList key={idx} summary={review.summary}/>);
//   // console.log('from review: ', props);
//   return (
//     <div>
//       <h2> ReviewsList </h2>
//       <ol>
//         {/* {props.items.map((item, index) => <ReviewList key={index} item={item}/>)} */}
//       </ol>
//     </div>
//   );
// }

import React from 'react';
import styled from 'styled-components';
import ReviewListEntry from './ReviewListEntry.jsx';

const gridLayout = {
  display: 'grid',
  padding: '10px',
  alignItems: 'center',
};

const ReviewList = ({reviewList, reviewEnd, handlePut, starSort, reviewCacheState, reviewCache }) => {
  // console.log(reviewList.results);
  return (
    <div>
      {
        starSort.length === 0
      && (
        <ul style={gridLayout}>
          {reviewList.results.slice(0, reviewEnd)
            .map((review, key) => (
              <ReviewListEntry
                review={review}
                key={key}
                handlePut={handlePut}
              />
            ))}
        </ul>
      )
      }
      {/* {
        starSort.length > 0
    && (
      <ul style={gridLayout}>
        {reviewCache[reviewCacheState].results
          .map((review, key) => starSort.map((star) => {
            if (Number(star) === review.rating) {
              return <ReviewListEntry review={review} key={key} handlePut={handlePut} />;
            }
          }))}
      </ul>
    )
      } */}
    </div>
  );
};

export default ReviewList;
