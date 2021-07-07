import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectUsers,
  selectSearchNameText,
  selectSearchLoginText,
  selectSearchEmailText,
  selectSearchPhoneText,
  selectSearchRatingText,
  addSearchText,
  loadFilteredUsers,
  selectSearchText,
} from '../users/usersSlice';
import { SortItem } from '../../types/types';

const SearchInputArea = styled.div`
  padding: 10px;
`;

const SearchInput: FC<SortItem> = ({ columnName }: SortItem) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
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

    if (value) {
      const filteredUsers = users.filter((user) => {
        if (columnName === 'rating') {
          return user[columnName] === Number(value);
        }
        return (user[columnName] as string).toLowerCase().indexOf(value) !== -1;
      });
      dispatch(loadFilteredUsers(filteredUsers));
    } else {
      dispatch(loadFilteredUsers(users));
    }
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
