import React from 'react';
import styled from 'styled-components';

const optionsBar = {
  width: '100px',
  boxShadow: '2px 2px 4px grey',
  marginLeft: '10px',
  border: '1px solid grey',
  textAlign: 'center',
  cursor: 'pointer',
};

class SortOptions extends React.Component {
  constructor(props) {
    super(props);
    this.totalReviews = this.totalReviews.bind(this);
  }

  totalReviews(obj) {
    const total = Number(obj.false) + Number(obj.true);
    return total;
  }

  render() {
    // console.log('printing prop:: ', this.props);
    const { listSortChange } = this.props;
    const { metaData } = this.props;
    return (
      <div style={{
        fontWeight: 'bold',
      }}
      >
        {`${this.totalReviews(metaData.recommended)} reviews, sorted by most`}
        <select style={optionsBar} onChange={listSortChange}>
          <option value="1">Relevant</option>
          <option value="2">Helpful</option>
          <option value="3">Recent</option>
        </select>
      </div>
    );
  }
}

export default SortOptions;
