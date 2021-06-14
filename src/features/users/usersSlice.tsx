import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import fetchUsers from './usersAPI';
import {
  UsersState,
  User,
  UsersList,
  Sorting,
} from '../../types/types';

const initialState: UsersState = {
  users: [],
  status: 'idle',
  searchText: '',
  filteredUsers: [],
  sorting: {
    columnName: '',
    rule: '',
  },
};

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();

    return response.data.results;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    addSorting: (state, action: PayloadAction<Sorting>) => {
      state.sorting = action.payload;
    },
    loadFilteredUsers: (state, action: PayloadAction<User[]>) => {
      state.filteredUsers = action.payload;
    },
    changeUserRaiting: (state, action: PayloadAction<{ id:string;raiting:number; }>) => {
      state.users
        .find((user) => user.id === action.payload.id).raiting = action.payload.raiting;
      state.filteredUsers
        .find((user) => user.id === action.payload.id).raiting = action.payload.raiting;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action:PayloadAction<[]>) => {
        const users = action.payload.map(({
          login: { uuid, username },
          picture: { thumbnail, large },
          name: { first, last },
          email,
          phone,
        }) => ({
          id: uuid,
          picture: {
            avatar: thumbnail,
            large,
          },
          name: `${first} ${last}`,
          login: username,
          email,
          phone,
          raiting: 0,
        }));

        state.status = 'idle';
        state.users = users;
        state.filteredUsers = users;
      });
  },
});

export const {
  addSearchText,
  loadFilteredUsers,
  changeUserRaiting,
  addSorting,
} = usersSlice.actions;

export const selectUsers: UsersList = (state) => state.users.users;
export const selectFilteredUsers: UsersList = (state) => state.users.filteredUsers;
export const selectUser: (state:RootState, id:string) => User = (state, id) => (
  state.users.users.find((user:User) => user.id === id)
);
export const selectSearchText: (state: RootState) => string = (state) => state.users.searchText;
export const selectSorting: (state: RootState) => Sorting = (state) => state.users.sorting;

export default usersSlice.reducer;
