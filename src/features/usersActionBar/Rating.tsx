import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectUser,
  changeUserRating,
  selectFilteredUsers,
  selectSorting,
  loadFilteredUsers,
  selectSearchRatingText,
} from '../users/usersSlice';
import { Params } from '../../types/types';

const Rating: FC<Params> = ({ id }: Params) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state, id));
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const sorting = useAppSelector(selectSorting);
  const searchRatingText = useAppSelector(selectSearchRatingText);

  useEffect(() => {
    let sortedUsers = filteredUsers;
    if (sorting.columnName === 'rating') {
      switch (sorting.rule) {
        case 'ASC': {
          sortedUsers = filteredUsers.slice().sort((a, b) => (
            a.rating > b.rating ? 1 : -1
          ));
          dispatch(loadFilteredUsers(sortedUsers));
          break;
        }
        case 'DSC': {
          sortedUsers = filteredUsers.slice().sort((a, b) => (
            a.rating < b.rating ? 1 : -1
          ));
          dispatch(loadFilteredUsers(sortedUsers));
          break;
        }
        default:
      }
    }

    if (searchRatingText) {
      const newFilteredUsers = sortedUsers.filter((item) => (
        item.rating === searchRatingText
      ));
      dispatch(loadFilteredUsers(newFilteredUsers));
    } else {
      dispatch(loadFilteredUsers(sortedUsers));
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUserRating({ id, rating: event.target.value }));
  };

  return (
    <input
      type="number"
      defaultValue={user.rating}
      max="5"
      min="-5"
      onChange={handleChange}
    />
  );
};

export default Rating;
