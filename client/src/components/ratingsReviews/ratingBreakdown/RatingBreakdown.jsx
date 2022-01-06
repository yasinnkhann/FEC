import React, { useContext } from 'react';
import styled from 'styled-components';
import { forEach } from 'lodash';
import Rating from '@material-ui/lab/Rating';
import RatingsBreakdownList from './RatingsBreakdownList.jsx';
import StarFilterEntry from './StarFilterEntry.jsx';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(1 1fr)',
  gridTemplateRows: 'minwidth(6 1fr) 100px',
  alignItems: 'center',
};

const recommendedAvgStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
  color: '#FDF0D5'
};

const avgRatingSpacing = {
  gridColumn: '1',
  gridRow: '2',
  fontSize: '40px',
  textAlign: 'center',
};



const clearStarFilterStyle = {
  display: 'flex',
  marginBottom: '5px',
  justifyContent: 'center',
  cursor: 'pointer',
};

const starFilterStyle = {
  display: 'flex',
  marginBottom: '10px',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const filtersContainer = {
  display: 'flex',
  marginBottom: '10px',
  justifyContent: 'center',
};

const Stars = styled.div`
  display: inline-block;
  font-family: Times;
  margin-left: 0rem;
  padding-top: 1rem;
`;

const averageRating = (obj) => {
  let wholeTotal = 0;
  let responseTotal = 0;
  for (const star in obj) {
    wholeTotal += Number(obj[star]) * Number(star);
    responseTotal += Number(obj[star]);
  }
  const result = wholeTotal / responseTotal;
  if (isNaN((Math.round(result * 4) / 4).toFixed(1))) {
    return 0;
  }
  return Number(result.toFixed(1));
};

const recommendedAverage = (obj) => {
  const total = Number(obj.false) + Number(obj.true);
  const result = Number(obj.true) / total;

  if (isNaN(result.toFixed(2) * 100)) {
    return 0;
  }
  return result.toFixed(2) * 100;
};

const RatingBreakdown = (props) => {
  const { ratings } = props.metaData;
  const { recommended } = props.metaData;
  const { sortByStar } = props;
  const { starSort } = props;
  const { clearStarFilter } = props;
  return (
    <div style={gridLayout}>
      <div style={avgRatingSpacing}>{averageRating(ratings).toFixed(1)}</div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '3',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Stars>
            <Rating name="read-only" value={averageRating(ratings)} precision={0.25} max={5} size="large" readOnly />
          </Stars>
        </div>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '4',
          color: 'grey',
          textAlign: 'center',
        }}
      >
        <div style={recommendedAvgStyle}>{`${recommendedAverage(recommended)}% of reviews recommend this product`}</div>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '5',
        }}
      >
        <div style={filtersContainer}>
          {starSort.length > 0 && (
            <div>
              <div style={starFilterStyle}>
                {starSort
                  .sort((a, b) => b - a)
                  .map((star) => (
                    <StarFilterEntry star={star} sortByStar={sortByStar} key={star} />
                  ))}
              </div>
              <div style={clearStarFilterStyle} aria-hidden="true" onClick={clearStarFilter}>
                <u style={{ color: 'grey', fontSize: '13px' }}>Clear Star Review Filter</u>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '6',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RatingsBreakdownList metaData={props.metaData} sortByStar={sortByStar} />
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;

//==========starRating version ===========================
// const StarRating = ({ averageRating, height, width }) => {
//   let rating = averageRating || 0;
//   const stars = [];
//   while (stars.length < 5) {
//     if (rating > 1) {
//       stars.push(1);
//     } else if (rating > 0) {
//       const empty = Math.abs(0 - rating);
//       const quart = Math.abs(0.25 - rating);
//       const half = Math.abs(0.5 - rating);
//       const three = Math.abs(0.75 - rating);
//       const full = Math.abs(1 - rating);
//       const closest = Math.min(empty, quart, half, three, full);
//       switch (closest) {
//       case (empty):
//         stars.push(0);
//         break;
//       case quart:
//         stars.push(0.28);
//         break;
//       case half:
//         stars.push(0.5);
//         break;
//       case three:
//         stars.push(0.72);
//         break;
//       case full:
//         stars.push(1.0);
//         break;
//       default:
//         // console.log('Testing From star right!');
//         stars.push(0);
//         break;
//       }
//     } else {
//       stars.push(0);
//     }
//     rating -= 1;
//   }
//   // console.log(stars);

//   return (
//     <div>
//       {stars.map((item, i) => (
//         <div
//           style={{
//             height: `${height}px`,
//             width: `${width}px`,
//             display: 'inline-block',
//           }}
//           key={i.toString()}
//         >
//           <div style={{
//             position: 'relative',
//             display: 'inline-block',
//             height: `${height}px`,
//             backgroundColor: '#f7df07',
//             width: `${parseInt(item * width, 10)}px`,
//           }}
//           >
//             <img
//               style={{
//                 height: `${height}px`,
//                 width: `${width}px`,
//               }}
//               src="star.png"
//               alt="stars alt"
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

//==============Material UI star rating ================
// import React, { useContext } from 'react';
// import ReviewsContext from './ReviewsContext.js';
// import styled from 'styled-components';
// import { forEach } from 'lodash';
// import Rating from '@material-ui/lab/Rating';

// const Reviews = styled.span `
//   cursor: pointer;
//   text-decoration: underline;
//   margin-left: 3rem;
// `;

// const Stars = styled.div `
//   display: inline-block;
//   font-family: Times;
//   margin-left: 4rem;
//   padding-top: 1rem;
// `;

// export default function ReviewsStars() {
//   const {reviewsData, setreviewsData} = useContext(ReviewsContext);
//   const totalReviews = () => {
//     let count = 0;
//     Object.entries(reviewsData.ratings).map(([key, value]) => {
//       return [parseInt(key), parseInt(value)];
//     })
//       .forEach(([key, value]) => {
//         count += value;
//       });
//     return count;
//   };
//   const average = () => {
//     let count = 0;
//     let sum = 0;
//     Object.entries(reviewsData.ratings).map(([key, value]) => {
//       return [parseInt(key), parseInt(value)];
//     })
//       .forEach(([key, value]) => {
//         count += value;
//         sum += (key * value);
//       });
//     return (sum / count);
//   };
//   //console.log('STARSRATINGSRESULTS', reviewsData.ratings);
//   return (
//     <div>
//       {totalReviews() ?
//         <>
//           <Reviews>
//             <a href='#route'>Read All {totalReviews()} Reviews</a>
//           </Reviews>
//           <div>
//             <Stars>
//               <Rating
//                 name="read-only"
//                 value={average()}
//                 precision={0.25}
//                 max={5}
//                 size="small"
//                 readOnly />
//             </Stars>
//           </div>
//         </>
//         : null}
//     </div>

//   );
// }
