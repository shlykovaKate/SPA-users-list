import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
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
  const sorting = useAppSelector(selectSorting);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
      if (event.currentTarget !== select) select.value = '';
    });
    dispatch(addSorting({ columnName, rule: event.target.value as '' | 'ASC' | 'DESC' }));
  };

  return (
    <Select onChange={handleChange} defaultValue={sorting.columnName === columnName ? sorting.rule : ''}>
      {(sorting.columnName === columnName && sorting.rule !== '') ? null : <option value="">...</option>}
      <option value="ASC">A-Z</option>
      <option value="DESC">Z-A</option>
    </Select>
  );
};

export default Sorting;
