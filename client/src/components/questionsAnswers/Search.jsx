import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  return (
    <Form>
      <SearchBar
        type='text'
        placeholder='Have a question? Search for answers…'
      />
      <MagnifyIcon />
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  display: flex;
  min-width: 100px;
`;

const SearchBar = styled.input`
  border: 1px solid grey;
  border-radius: 5px;
  height: 25px;
  width: 100%;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
`;

const MagnifyIcon = styled(SearchIcon)`
  && {
    color: black;
  }
`;
