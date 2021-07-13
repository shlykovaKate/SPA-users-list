import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectSearchNameText,
  selectSearchLoginText,
  selectSearchEmailText,
  selectSearchPhoneText,
  selectSearchRatingText,
  addSearchText,
  selectSearchText,
} from '../users/usersSlice';
import { SortItem } from '../../types/types';

const SearchInputArea = styled.div`
  padding: 10px;
`;

const SearchInput: FC<SortItem> = ({ columnName }: SortItem) => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(selectSearchText);
  let inputValue;

  switch (columnName) {
    case 'name': {
      inputValue = useAppSelector(selectSearchNameText);
      break;
    }
    case 'login': {
      inputValue = useAppSelector(selectSearchLoginText);
      break;
    }
    case 'email': {
      inputValue = useAppSelector(selectSearchEmailText);
      break;
    }
    case 'phone': {
      inputValue = useAppSelector(selectSearchPhoneText);
      break;
    }
    case 'rating': {
      inputValue = useAppSelector(selectSearchRatingText);
      break;
    }
    default:
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value.trim();

    dispatch(addSearchText({
      ...searchText,
      [columnName]: value,
    }));
  };

  return (
    <SearchInputArea>
      <label htmlFor={columnName}>
        {`${columnName}: `}
      </label>
      <input
        type={columnName === 'rating' ? 'number' : 'text'}
        placeholder="Type the search text"
        onChange={handleChange}
        id={columnName}
        value={inputValue}
      />
    </SearchInputArea>
  );
};

export default SearchInput;
