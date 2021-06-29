import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectFilteredUsers,
  loadFilteredUsers,
  selectSorting,
  addSorting,
} from '../users/usersSlice';
import { SortItem } from '../../types/types';

const Select = styled.select`
  background: transparent;
  outline: none;
`;

const Sorting: FC<SortItem> = ({ columnName }: SortItem) => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const sorting = useAppSelector(selectSorting);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
      if (event.currentTarget !== select) select.value = '';
    });

    switch (event.target.value) {
      case 'ASC': {
        const sortedUsers = filteredUsers.slice().sort((a, b) => {
          if (a[columnName] === b[columnName]) return 0;
          return a[columnName] > b[columnName] ? 1 : -1;
        });
        dispatch(addSorting({ columnName, rule: event.target.value }));
        dispatch(loadFilteredUsers(sortedUsers));
        break;
      }
      case 'DSC': {
        const sortedUsers = filteredUsers.slice().sort((a, b) => {
          if (a[columnName] === b[columnName]) return 0;
          return a[columnName] < b[columnName] ? 1 : -1;
        });
        dispatch(addSorting({ columnName, rule: event.target.value }));
        dispatch(loadFilteredUsers(sortedUsers));
        break;
      }
      default:
    }
  };

  return (
    <Select onChange={handleChange} defaultValue={sorting.columnName === columnName ? sorting.rule : ''}>
      {(sorting.columnName === columnName && sorting.rule !== '') ? null : <option value="">...</option>}
      <option value="ASC">A-Z</option>
      <option value="DSC">Z-A</option>
    </Select>
  );
};

export default Sorting;
