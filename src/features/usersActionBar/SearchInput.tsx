import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectUsers,
  selectSearchText,
  addSearchText,
  loadFilteredUsers,
} from '../users/usersSlice';

const SearchInput: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const searchText = useAppSelector(selectSearchText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value.trim();
    dispatch(addSearchText(value));
    if (value) {
      const filteredUsers = users.filter((user) => (
        user.name.indexOf(value) !== -1
        || user.login.indexOf(value) !== -1
        || user.email.indexOf(value) !== -1
        || user.phone.indexOf(value) !== -1
        || user.rating === Number(value)
      ));
      dispatch(loadFilteredUsers(filteredUsers));
    } else {
      dispatch(loadFilteredUsers(users));
    }
  };

  return (
    <form>
      <input placeholder="Type the search text" onChange={handleChange} value={searchText} />
    </form>
  );
};

export default SearchInput;
