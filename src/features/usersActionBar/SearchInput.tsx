import React, { FC } from 'react';
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
          return user[columnName] === value;
        }
        return (user[columnName] as string).toLowerCase().indexOf(value) !== -1;
      });
      dispatch(loadFilteredUsers(filteredUsers));
    } else {
      dispatch(loadFilteredUsers(users));
    }
  };

  return (
    <div>
      <span>
        {`Search in ${columnName} column`}
      </span>
      <input type={columnName === 'rating' ? 'number' : 'text'} placeholder="Type the search text" onChange={handleChange} name={columnName} value={inputValue} />
    </div>
  );
};

export default SearchInput;
