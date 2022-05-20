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
  border-radius: 1rem;
  color: #38062b;
  outline: none;
  padding: 0.4rem 0.5rem;
  margin-left: 0.5rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 1.5rem;
  background-image: url('https://img.icons8.com/material-sharp/24/000000/sort-down.png');
  background-repeat: no-repeat;
  background-position: calc(100% - 0.3rem) center;
  background-size: 1.1rem;
`;

const DropdownOptions = styled.option``;
