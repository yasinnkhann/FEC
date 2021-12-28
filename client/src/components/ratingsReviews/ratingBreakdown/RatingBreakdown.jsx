// import React from 'react';
// import styled from 'styled-components';
// // import ReviewListEntry from './reviewListEntry';

// const gridLayout = {
//   display: 'grid',
//   padding: '10px',
//   alignItems: 'center',
// };

// const ReviewList = ({reviewList, reviewEnd, handlePut, starSort, reviewCacheState, reviewCache }) => (
//   <div>
//     {
//       starSort.length === 0
//       && (
//         <ul style={gridLayout}>
//           {reviewList.slice(0, reviewEnd)
//             .map((review, key) => (
//               <ReviewListEntry
//                 review={review}
//                 key={key}
//                 handlePut={handlePut}
//               />
//             ))}
//         </ul>
//       )
//     }
//     {
//       starSort.length > 0
//     && (
//       <ul style={gridLayout}>
//         {reviewCache[reviewCacheState].results
//           .map((review, key) => starSort.map((star) => {
//             if (Number(star) === review.rating) {
//               return <ReviewListEntry review={review} key={key} handlePut={handlePut} />;
//             }
//           }))}
//       </ul>
//     )
//     }
//   </div>
// );

// export default ReviewList;
import React from 'react';
import styled from 'styled-components';
import RatingsBreakdownList from './RatingsBreakdownList.jsx';
import StarFilterEntry from './StarFilterEntry.jsx';
import ImageList from './ImageList.jsx';



const RatingBreakdown = ({dummyData}) => {
  const onDetailClick = (index) => {
    // console.log('Detail clicked: ', index);
  };

  // console.log('From ReviewBreakdown: ', dummyData);
  const renderedDummyData = dummyData.results.map((item, index) => {
    return (
      <React.Fragment key={item.review_id}>
        <div>
          Item ID: {item.review_id}
        </div>
        <div>
          Rating: {item.rating}
        </div>
        <div>
          Date: {item.date}
        </div>
        <div>
          <h3>Summary: {item.summary}</h3>
          <ImageList imageData={item.photos}/>
        </div>
        <div onClick={() => onDetailClick(index)}>
          <i className="dropdown icon"></i>
          Details: {item.body}
        </div>
      </React.Fragment>
    );
  });

  return (
    <div>
      <h1>{dummyData.results.length} reviews</h1>
      {renderedDummyData}
    </div>
  );
};

export default RatingBreakdown;
