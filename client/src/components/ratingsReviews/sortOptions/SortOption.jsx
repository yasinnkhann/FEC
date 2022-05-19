import React from 'react';
import styled from 'styled-components';

export default function SortOptions({ listSortChange, metaData }) {
  const totalReviews = ratingObj => {
    var total = 0;
    for (var key in ratingObj) {
      total += Number(ratingObj[key]);
    }
    return total;
  };

  return (
    <>
      {`${totalReviews(metaData.ratings)} reviews, sorted by most`}
      <DropdownSelect onChange={listSortChange}>
        <DropdownOptions value='1'>Relevant</DropdownOptions>
        <DropdownOptions value='2'>Helpful</DropdownOptions>
        <DropdownOptions value='3'>Newest</DropdownOptions>
      </DropdownSelect>
    </>
  );
}

const DropdownSelect = styled.select`
  width: 95px;
  margin-left: 5px;
  border: 1px solid #38062b;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: inline-block;
  min-width: 90px;
  box-shadow: 0px 4px 8px 0px #0afa0a33;
  padding: 6px 8px;
  z-index: 1;
  border-radius: 16px;
  background-color: #b1a9ac;
  color: #38062b;
  outline: none;
`;

const DropdownOptions = styled.option`
  background-color: #b1a9ac;
  color: #38062b;
`;
