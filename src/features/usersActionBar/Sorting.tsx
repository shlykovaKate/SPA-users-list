import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectFilteredUsers,
  loadFilteredUsers,
} from '../users/usersSlice';
import { SortItem } from '../../types/types';

const Select = styled.select`
  background: transparent;
  margin: 0 10px 0 0;
  outline: none;
  overflow: hidden;
`;

const Sorting: FC<SortItem> = ({ columnName }: SortItem) => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(selectFilteredUsers);

  const deleteEmptyOption = (select: HTMLSelectElement) => {
    const option = select.querySelector("option[value='']");
    return option && option.remove();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'ASC': {
        const sortedUsers = filteredUsers.slice().sort((a, b) => (
          a[columnName] > b[columnName] ? 1 : -1
        ));
        dispatch(loadFilteredUsers(sortedUsers));
        deleteEmptyOption(event.currentTarget);
        break;
      }
      case 'DSC': {
        const sortedUsers = filteredUsers.slice().sort((a, b) => (
          a[columnName] < b[columnName] ? 1 : -1
        ));
        dispatch(loadFilteredUsers(sortedUsers));
        deleteEmptyOption(event.currentTarget);
        break;
      }
      default:
    }
  };

  return (
    <Select onChange={handleChange}>
      <option value="">...</option>
      <option value="ASC">A-Z</option>
      <option value="DSC">Z-A</option>
    </Select>
  );
};

export default Sorting;
