import type { RootState } from '../app/store';

export interface IUser {
  id: string;
  avatar: string;
  name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UsersState {
  users: IUser[];
  status: 'idle' | 'loading' | 'failed';
  searchText: string;
  filteredUsers: IUser[];
}

export type TselectUsers = (state: RootState) => IUser[]
