import React, { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectUsers,
  addSearchText,
  loadFilteredUsers,
} from '../users/usersSlice';

const SearchInput: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addSearchText(value));
    if (value.trim()) {
      const filteredUsers = users.filter((user) => (
        user.name.indexOf(value) !== -1
        || user.login.indexOf(value) !== -1
        || user.email.indexOf(value) !== -1
        || user.phone.indexOf(value) !== -1
      ));
      dispatch(loadFilteredUsers(filteredUsers));
    } else {
      dispatch(loadFilteredUsers(users));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Type the search text" onChange={handleChange} value={value} />
    </form>
  );
};

export default SearchInput;
