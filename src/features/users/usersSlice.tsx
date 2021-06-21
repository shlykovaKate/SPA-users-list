import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import fetchUsers from './usersAPI';
import {
  UsersState,
  User,
  UsersList,
  Sorting,
  SearchText,
} from '../../types/types';

const initialState: UsersState = {
  users: [],
  status: 'idle',
  searchText: {
    name: '',
    login: '',
    email: '',
    phone: '',
    rating: '',
  },
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
    addSearchText: (state, action: PayloadAction<SearchText>) => {
      state.searchText = action.payload;
    },
    addSorting: (state, action: PayloadAction<Sorting>) => {
      state.sorting = action.payload;
    },
    loadFilteredUsers: (state, action: PayloadAction<User[]>) => {
      state.filteredUsers = action.payload;
    },
    changeUserRating: (state, action: PayloadAction<{ id: string; rating: string; }>) => {
      state.users
        .find((user) => user.id === action.payload.id).rating = action.payload.rating;
      state.filteredUsers
        .find((user) => user.id === action.payload.id).rating = action.payload.rating;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.filteredUsers = state.filteredUsers.filter((user) => user.id !== action.payload);
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
          rating: '0',
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
  changeUserRating,
  addSorting,
  removeUser,
} = usersSlice.actions;

export const selectUsers: UsersList = (state) => state.users.users;
export const selectFilteredUsers: UsersList = (state) => state.users.filteredUsers;
export const selectUser: (state:RootState, id:string) => User = (state, id) => (
  state.users.users.find((user:User) => user.id === id)
);
export const selectSearchText: (state: RootState) => SearchText = (state) => state.users.searchText;
export const selectSearchNameText: (state: RootState) => string = (state) => (
  state.users.searchText.name
);
export const selectSearchLoginText: (state: RootState) => string = (state) => (
  state.users.searchText.login
);
export const selectSearchEmailText: (state: RootState) => string = (state) => (
  state.users.searchText.email
);
export const selectSearchPhoneText: (state: RootState) => string = (state) => (
  state.users.searchText.phone
);
export const selectSearchRatingText: (state: RootState) => string = (state) => (
  state.users.searchText.rating
);
export const selectSorting: (state: RootState) => Sorting = (state) => state.users.sorting;

export default usersSlice.reducer;
