import React, { useRef } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export default function Search({ handleChange }) {
  const searchRef = useRef(null);

  return (
    <Container>
      <SearchBar
        type='text'
        color='#B1A9AC'
        ref={searchRef}
        placeholder='Have a question? Search for answers…'
        onChange={() => handleChange(searchRef.current.value)}
        data-testid='searchBar'
      />
      <MagnifyGlassIcon />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 1rem;
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  border: 1px solid grey;
  border-radius: 5px;
  outline: 0;
  background-color: #b1a9ac;
  ::placeholder {
    color: #38062b;
  }
`;

const MagnifyGlassIcon = styled(SearchIcon)`
  position: absolute;
  right: 1rem;
  margin-top: 0.2rem;

  &&& {
    color: #38062b;
  }
`;
