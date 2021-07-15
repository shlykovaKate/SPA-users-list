import { SortBy } from '../types/types';

const sortBy: SortBy = (list, { rule, columnName }) => (
  list.slice().sort((a, b) => (
    rule === 'DESC'
      ? a[columnName] > b[columnName] ? -1 : 1
      : a[columnName] > b[columnName] ? 1 : -1
  ))
);

export default sortBy;
