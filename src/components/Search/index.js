import React from 'react';
import { SearchWrapper, SearchIconWrapper, StyledInputBase } from './SearchStyles';
import { SearchIcon } from '~/assets/Icons';

function Search({ placeholder,onChange }) {
  const handleInputChange = (event) => {
    const { value } = event.target;
    onChange(value); 
  };
  return (
    <SearchWrapper >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase onChange={handleInputChange} placeholder={placeholder} />
    </SearchWrapper>
  );
}

export default Search;
