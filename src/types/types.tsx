import type { RootState } from '../app/store';

export type UsersList = (state: RootState) => User[];

export interface Params {
  id: string;
}

export interface RatingProp {
  id: string;
  max: number;
  min: number;
}

export interface RateProp {
  handleClick: (event: React.MouseEvent<SVGSVGElement>) => void;
  value: string;
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
  rating: string;
}

export interface SearchText {
  name: string;
  login: string;
  email: string;
  phone: string;
  rating: string;
}

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
  searchText: SearchText;
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
