import type { RootState } from '../app/store';

export type UsersList = (state: RootState) => UserItem[];

export interface UserItem {
  id: string;
  avatar: string;
  [name: string]: string;
  login: string;
  email: string;
  phone: string;
}

export interface UsersState {
  users: UserItem[];
  status: 'idle' | 'loading' | 'failed';
  searchText: string;
  filteredUsers: UserItem[];
}

export interface SortItem {
  columnName: string;
}
