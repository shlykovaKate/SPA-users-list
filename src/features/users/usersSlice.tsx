import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import fetchUsers from './usersAPI';
import { UsersState, UserItem, UsersList } from '../../types/types';

const initialState: UsersState = {
  users: [],
  status: 'idle',
  searchText: '',
  filteredUsers: [],
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
    loadFilteredUsers: (state, action: PayloadAction<UserItem[]>) => {
      state.filteredUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action:PayloadAction<[]>) => {
        const users = action.payload.map(({
          login: { uuid, username }, picture: { thumbnail }, name: { first, last }, email, phone,
        }) => ({
          id: uuid,
          avatar: thumbnail,
          name: `${first} ${last}`,
          login: username,
          email,
          phone,
        }));

        state.status = 'idle';
        state.users = users;
        state.filteredUsers = users;
      });
  },
});

export const { addSearchText, loadFilteredUsers } = usersSlice.actions;

export const selectUsers: UsersList = (state) => state.users.users;
export const selectFilteredUsers: UsersList = (state) => state.users.filteredUsers;
export const selectSearchText: (state: RootState) => string = (state) => state.users.searchText;

export default usersSlice.reducer;
