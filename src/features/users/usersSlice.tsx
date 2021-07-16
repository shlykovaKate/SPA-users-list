import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import fetchUsers from './usersAPI';
import { SortParams } from '../../utils/sortBy';

export interface User {
  id: string;
  picture: {
    avatar: string;
    large: string;
  };
  name: string;
  login: string;
  email: string;
  phone: string;
  rating: number;
}

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
  searchText: {
    name: string;
    login: string;
    email: string;
    phone: string;
    rating: string;
  };
  sorting: SortParams<User>
}

type UsersList = (state: RootState) => User[];

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
  sorting: {
    columnName: 'name',
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
    addSearchText: (state, action: PayloadAction<UsersState['searchText']>) => {
      state.searchText = action.payload;
    },
    addSorting: (state, action: PayloadAction<UsersState['sorting']>) => {
      state.sorting = action.payload;
    },
    changeUserRating: (state, action: PayloadAction<{ id: string; rating: number; }>) => {
      state.users
        .find((user) => user.id === action.payload.id)!.rating = action.payload.rating;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
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
          rating: 0,
        }));

        state.status = 'idle';
        state.users = users;
      });
  },
});

export const {
  addSearchText,
  changeUserRating,
  addSorting,
  removeUser,
} = usersSlice.actions;

export const selectUsers: UsersList = (state) => state.users.users;
export const selectUser: (state: RootState, id: string) => User = (state, id) => (
  state.users.users.find((user) => user.id === id)!
);
export const selectSearchText: (state: RootState) => UsersState['searchText'] = (state) => state.users.searchText;
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
export const selectSorting: (state: RootState) => UsersState['sorting'] = (state) => state.users.sorting;

export default usersSlice.reducer;
