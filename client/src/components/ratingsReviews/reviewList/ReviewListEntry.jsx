import React, { useContext } from 'react';
import styled from 'styled-components'; // need this for Stars
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import PhotosMap from './PhotosMap.jsx';
import { serverURL } from '../../../config.js';

const Stars = styled.div`
  display: inline-block;
  font-family: Times;
  margin-left: 0rem;
  padding-top: 1rem;
`;

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplatRows: 'repeat(6, 1fr)',
  borderBottom: '1px solid #B1A9AC',
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
  color: '#B1A9AC',
  fontSize: '13px',
};

const dateLayout = {
  padding: '5px',
  textAlign: 'center',
  gridRow: '1',
  gridColumn: '3',
  color: '#B1A9AC',
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
  color: '#B1A9AC',
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
  color: '#B1A9AC',
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
    this.handlePutEntryHelpful = this.handlePutEntryHelpful.bind(this);
    this.handlePutEntryReported = this.handlePutEntryReported.bind(this);
  }

  handlePutEntryHelpful(e) {
    const body = {};
    const review_id = this.props.review.review_id;
    axios
      .put(`${serverURL}/reviews/helpful`, body, {
        params: {
          review_id: review_id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(results => {
        alert('Helpful feedback received!');
      })
      .catch(err => {
        console.log(err);
        alert("There's been an issue with your request");
      });
  }

  handlePutEntryReported(e) {
    const body = {};
    const review_id = this.props.review.review_id;
    axios
      .put(`${serverURL}/reviews/report`, body, {
        params: {
          review_id: review_id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(results => {
        alert('Reported!');
      })
      .catch(err => {
        console.log(err);
        alert("There's been an issue with your request");
      });
  }

  render() {
    const { review } = this.props;
    return (
      <div className='ratings-flexbox-container' style={gridLayout}>
        <div style={starLayout}>
          <div style={{ display: 'flex', zIndex: '-1', marginRight: 'auto' }}>
            <Stars>
              <Rating
                name='read-only'
                value={review.rating}
                precision={0.25}
                max={5}
                size='small'
                readOnly
              />
            </Stars>
          </div>
        </div>

        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <div style={nameLayout}>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              {review.reviewer_name},
            </div>
          </div>

          <div style={dateLayout}>
            <div style={{ display: 'flex' }}>
              {new Date(review.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
        {review.summary ? (
          <div style={reviewLayout}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              {review.summary}
            </div>
          </div>
        ) : (
          <div style={emptyDiv} />
        )}
        <div style={bodyLayout}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {review.body}
          </div>
        </div>
        {review.response !== null ? (
          <div style={responseLayout}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <b>{`Response from seller: ${review.response}`}</b>
            </div>
          </div>
        ) : (
          <div style={emptyDiv} />
        )}
        {review.recommend === true ? (
          <div style={recommendLayout}>
            <div style={{ display: 'flex' }}>✓ I recommend this product</div>
          </div>
        ) : (
          <div style={emptyDiv} />
        )}
        <div style={helpfulnessLayout}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {review.photos.length > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <PhotosMap photos={review.photos} />
              </div>
            ) : (
              <div style={emptyDiv} />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                float: 'right',
                marginLeft: 'auto',
                marginTop: 'auto',
              }}
            >
              {' '}
              Helpful?
              <u
                onClick={this.handlePutEntryHelpful}
                aria-hidden='true'
                id='helpful'
                style={{ marginLeft: '4px', marginRight: '2px' }}
              >
                Yes
              </u>
              {`(${review.helpfulness}) | `}
              <u
                onClick={this.handlePutEntryReported}
                aria-hidden='true'
                id='report'
                style={{ marginLeft: '4px' }}
              >
                Report
              </u>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewListEntry;
