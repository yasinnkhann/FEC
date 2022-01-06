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
  backgroundColor: '#b1a9ac',
  color: '#38062b'
};
const DropdownOptions = styled.option `
  background-color: #b1a9ac;
  color: #38062b;
`;
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
    // console.log('printing props from SortOptions:: ', this.props);
    // console.log(listSortChange);
    // console.log(metaData);
    // console.log(this.props.listSort);
    return (
      <div>
        <div style={{ fontWeight: 'bold' }}>
          {`${this.totalReviews(metaData.ratings)} reviews, sorted by most`}
          <select style={optionsBar} onChange={listSortChange}>
            <DropdownOptions value="1">Relevant</DropdownOptions>
            <DropdownOptions value="2">Helpful</DropdownOptions>
            <DropdownOptions value="3">Newest</DropdownOptions>
          </select>
        </div>
      </div>
    );
  }
}

export default SortOptions;
