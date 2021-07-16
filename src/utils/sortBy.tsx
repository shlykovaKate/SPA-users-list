export interface SortParams<T> {
  columnName: keyof T;
  rule?: 'ASC' | 'DESC';
}

type SortBy = <T>(list: T[], { rule, columnName }: SortParams<T>) => T[];

const sortBy: SortBy = (list, { rule, columnName }) => (
  list.slice().sort((a, b) => (
    rule === 'DESC'
      ? a[columnName] > b[columnName] ? -1 : 1
      : a[columnName] > b[columnName] ? 1 : -1
  ))
);

export default sortBy;
