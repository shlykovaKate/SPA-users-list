import type { RootState } from '../app/store';

export type UsersList = (state: RootState) => User[];

export interface Params {
  id: string;
}

export interface UserPhotos {
  avatar: string;
  large: string;
}

export interface User {
  id: string;
  picture: UserPhotos;
  name: string;
  login: string;
  email: string;
  phone: string;
  raiting: number;
}

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
  searchText: string;
  filteredUsers: User[];
  sorting: Sorting
}

export interface SortItem {
  columnName: keyof User;
}

export interface Sorting {
  columnName: string;
  rule: 'ASC' | 'DSC' | ''
}
