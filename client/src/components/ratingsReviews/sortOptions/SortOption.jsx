import React from 'react';
import styled from 'styled-components';

const optionsBar = {
  width: '95px',
  marginLeft: '5px',
  border: '1px solid grey',
  textAlign: 'center',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
  backgroundColor: '#f9f9f9',
  minWidth: '90px',
  boxShadow: '0px 4px 8px 0px #0afa0a33',
  padding: '6px 8px',
  zIndex: '1',
  borderRadius: '16px',
};

class SortOptions extends React.Component {
  constructor(props) {
    super(props);
    this.totalReviews = this.totalReviews.bind(this);
  }

  totalReviews(ratingObj) {
    var total = 0;
    for (var key in ratingObj) {
      total += Number(ratingObj[key]);
    }
    return total;
  }

  render() {
    const { listSortChange } = this.props;
    const { metaData } = this.props;
    return (
      <div style={{ fontWeight: 'bold' }}>
        {`${this.totalReviews(metaData.ratings)} reviews, sorted by most`}
        <select style={optionsBar} onChange={listSortChange}>
          <option value="1">Relevant</option>
          <option value="2">Helpful</option>
          <option value="3">Newest</option>
        </select>
      </div>
    );
  }
}

export default SortOptions;
