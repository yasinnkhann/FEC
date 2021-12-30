import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhotosMap from './PhotosMap.jsx';
// import StarRating from '../../shared/starRating';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplatRows: 'repeat(6, 1fr)',
  borderBottom: '1px solid grey',
  paddingTop: '10px',
  paddingBottom: '8px',
};

const starLayout = {
  gridColumn: '1/3',
  gridRow: '1',
};

const nameLayout = {
  padding: '5px',
  textAlign: 'right',
  gridRow: '1',
  gridColumn: '2',
  color: 'grey',
  fontSize: '13px',
};

const dateLayout = {
  padding: '5px',
  textAlign: 'center',
  gridRow: '1',
  gridColumn: '3',
  color: 'grey',
  fontSize: '13px',
};

const reviewLayout = {
  padding: '5px',
  gridRow: '2',
  gridColumnEnd: 'span 3',
  fontWeight: 'bold',
};

const bodyLayout = {
  padding: '5px',
  fontSize: '13px',
  gridRow: '3',
  gridColumnEnd: 'span 3',
};

const recommendLayout = {
  padding: '5px',
  color: 'grey',
  fontSize: '12px',
  gridRow: '4',
  gridColumn: '1/-1',
};

const responseLayout = {
  padding: '5px',
  fontSize: '13px',
  gridRow: '5',
  gridColumnEnd: 'span 3',
  backgroundColor: 'lightgrey',
};

const helpfulnessLayout = {
  padding: '5px',
  color: 'grey',
  fontSize: '11px',
  gridRowEnd: '7',
  gridColumnEnd: 'span 3',
};

const emptyDiv = {
  height: '0px',
  width: '0px',
};

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handlePutEntry = this.handlePutEntry.bind(this);
    this.averageRating = this.averageRating.bind(this);
  }

  handlePutEntry(e) {
    axios.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', {
      review_id: this.props.review.review_id,
      type: e.target.id,
    })
      .then((results) => {
        alert('Your request has been received!');
      })
      .catch((err) => {
        console.log(err);
        alert('There\'s been an issue with your request');
      });
  }

  averageRating(obj) {
    // console.log(obj);
    let wholeTotal = 0;
    let responseTotal = 0;
    for (const star in obj) {
      wholeTotal += (Number(obj[star]) * Number(star));
      responseTotal += Number(obj[star]);
    }
    const result = wholeTotal / responseTotal;
    if (isNaN((Math.round(result * 4) / 4).toFixed(1))) {
      return 0;
    }
    return result;
  }

  render() {
    const { review } = this.props;
    return (
      <div className="ratings-flexbox-container" style={gridLayout}>

        <div style={starLayout}>
          <div style={{ display: 'flex', zIndex: '-1', marginRight: 'auto' }}>
            <StarRating averageRating={review.rating} height={18} width={15} />
          </div>
        </div>

        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <div style={nameLayout}>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              {review.reviewer_name}
              ,
            </div>
          </div>

          <div style={dateLayout}>
            <div style={{ display: 'flex' }}>
              {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

        </div>

        {
          review.summary
            ? (
              <div style={reviewLayout}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {review.summary}
                </div>
              </div>
            )
            : <div style={emptyDiv} />
        }

        <div style={bodyLayout}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {review.body}
          </div>
        </div>

        {
          review.response !== null
            ? (
              <div style={responseLayout}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <b>{`Response from seller: ${review.response}`}</b>
                </div>
              </div>
            )
            : <div style={emptyDiv} />
        }

        {
          review.recommend === true
            ? (
              <div style={recommendLayout}>
                <div style={{ display: 'flex' }}>
                ✓ I recommend this product
                </div>
              </div>
            )
            : <div style={emptyDiv} />
        }

        <div style={helpfulnessLayout}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {
              review.photos.length > 0
                ? (
              // <div style={photoLayout}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <PhotosMap photos={review.photos} />
                    {/* </div> */}
                  </div>
                )
                : <div style={emptyDiv} />
            }
            <div style={{
              display: 'flex', justifyContent: 'flex-end', float: 'right', marginLeft: 'auto', marginTop: 'auto',
            }}
            >
              Helpful?
              <u onClick={this.handlePutEntry} aria-hidden="true" id="helpful" style={{ marginLeft: '4px', marginRight: '2px' }}>Yes</u>
              {`(${review.helpfulness}) | `}
              <u onClick={this.handlePutEntry} aria-hidden="true" id="report" style={{ marginLeft: '4px' }}>Report</u>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewListEntry;


const StarRating = ({ averageRating, height, width }) => {
  // console.log('from star rating:: ', { averageRating, height, width }); //{averageRating: 5, height: 18, width: 15}
  let rating = averageRating || 0;
  const stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      const empty = Math.abs(0 - rating);
      const quart = Math.abs(0.25 - rating);
      const half = Math.abs(0.5 - rating);
      const three = Math.abs(0.75 - rating);
      const full = Math.abs(1 - rating);
      const closest = Math.min(empty, quart, half, three, full);
      switch (closest) {
      case (empty):
        stars.push(0);
        break;
      case quart:
        stars.push(0.28);
        break;
      case half:
        stars.push(0.5);
        break;
      case three:
        stars.push(0.72);
        break;
      case full:
        stars.push(1.0);
        break;
      default:
        console.log('Hey there!!');
        stars.push(0);
        break;
      }
    } else {
      stars.push(0);
    }
    rating -= 1;
  }
  // console.log(stars);

  return (
    <div>
      {stars.map((item, i) => (
        <div
          style={{
            height: `${height}px`,
            width: `${width}px`,
            display: 'inline-block',
          }}
          key={i.toString()}
        >
          <div style={{
            position: 'relative',
            display: 'inline-block',
            height: `${height}px`,
            backgroundColor: '#fff34e',
            width: `${parseInt(item * width, 10)}px`,
          }}
          >
            <img
              style={{
                height: `${height}px`,
                width: `${width}px`,
              }}
              src="star.png"
              alt="stars alt"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
