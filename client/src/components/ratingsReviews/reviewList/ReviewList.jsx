import React from 'react';
import styled from 'styled-components';



const ReviewList = () => (<div>{props.item}</div>);

export default function Reviews(props) {
  // const mappedReviews = dummyDataReviews.result.map((review, indx) => <ReviewList key={idx} summary={review.summary}/>);
  // console.log('from review: ', props);
  return (
    <div>
      <h2>Reviews!!!!!!Testing</h2>
      <ol>
        {/* {props.items.map((item, index) => <ReviewList key={index} item={item}/>)} */}
      </ol>
    </div>
  );
}





// const example = {
//   result: [
//     {
//       rating: 5,
//       summary: 'summary rate 5',
//       body: 'We have been very happy with their pressure cookers (4, 6 and 8 qt) and wanted a good multi-cooker to cover our slow-cooking needs'
//     },
//     {
//       rating: 4,
//       summary: 'summary rate 4',
//       body: 'We have been very happy with their pressure cookers multi-cooker to cover our slow-cooking needs'
//     },
//     {
//       rating: 3,
//       summary: 'summary rate 3',
//       body: ' wanted a good multi-cooker to cover our slow-cooking needs'
//     }
//   ]
// };