import reducer from './usersSlice';
import { initialState, filteredUsers } from '../../__mock__/mockedStore';

describe('usersSlice', () => {
  it('should work the changeUserRating reducer', () => {
    const expectedState = [{
      ...initialState.users.users.filter((user) => user.id === '2d049a1e-4935-4114-88b1-085aee6f6699')[0],
      rating: 3,
    }];
    const newState = reducer(initialState.users, {
      type: 'users/changeUserRating',
      payload: {
        id: '2d049a1e-4935-4114-88b1-085aee6f6699',
        rating: 3,
      },
    });
    expect(newState.users.filter((user) => user.id === '2d049a1e-4935-4114-88b1-085aee6f6699')).toEqual(expectedState);
  });

  it('should work the removeUser reducer', () => {
    const expectedState = initialState.users.users.filter((user) => user.id !== '72811834-351c-455a-b428-3097ec0b7480');
    const newState = reducer(initialState.users, {
      type: 'users/removeUser',
      payload: '72811834-351c-455a-b428-3097ec0b7480',
    });
    expect(newState.users).toEqual(expectedState);
  });

  it('should work the removeUser reducer', () => {
    const expectedState = {
      ...initialState.users,
      searchText: '66',
    };
    const newState = reducer(initialState.users, {
      type: 'users/addSearchText',
      payload: '66',
    });
    expect(newState).toEqual(expectedState);
  });

  it('should work the addSorting reducer', () => {
    const expectedState = {
      ...initialState.users,
      sorting: {
        columnName: 'name',
        rule: 'DSC',
      },
    };
    const newState = reducer(initialState.users, {
      type: 'users/addSorting',
      payload: {
        columnName: 'name',
        rule: 'DSC',
      },
    });
    expect(newState).toEqual(expectedState);
  });

  it('should work the loadFilteredUsers reducer', () => {
    const expectedState = {
      ...initialState.users,
      filteredUsers,
    };
    const newState = reducer(initialState.users, {
      type: 'users/loadFilteredUsers',
      payload: filteredUsers,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should work the fetchUsersAsync reducer (pending status)', () => {
    const expectedState = {
      ...initialState.users,
      status: 'loading',
    };
    const newState = reducer(initialState.users, {
      type: 'users/fetchUsers/pending',
    });
    expect(newState).toEqual(expectedState);
  });

  it('should work the fetchUsersAsync reducer (fulfilled status)', () => {
    const expectedState = {
      ...initialState.users,
      status: 'idle',
      users: [
        {
          email: 'alba.montero@example.com',
          id: '0972d854-c9bb-4d14-a6cf-65482f4a8d07',
          login: 'yellowkoala383',
          name: 'Alba Montero',
          phone: '992-658-046',
          picture: {
            avatar: 'https://randomuser.me/api/portraits/thumb/women/15.jpg',
            large: 'https://randomuser.me/api/portraits/women/15.jpg',
          },
          rating: 0,
        },
      ],
      filteredUsers: [
        {
          email: 'alba.montero@example.com',
          id: '0972d854-c9bb-4d14-a6cf-65482f4a8d07',
          login: 'yellowkoala383',
          name: 'Alba Montero',
          phone: '992-658-046',
          picture: {
            avatar: 'https://randomuser.me/api/portraits/thumb/women/15.jpg',
            large: 'https://randomuser.me/api/portraits/women/15.jpg',
          },
          rating: 0,
        },
      ],
    };
    const newState = reducer(initialState.users, {
      type: 'users/fetchUsers/fulfilled',
      payload: [
        {
          email: 'alba.montero@example.com',
          login: {
            username: 'yellowkoala383',
            uuid: '0972d854-c9bb-4d14-a6cf-65482f4a8d07',
          },
          name: {
            first: 'Alba',
            last: 'Montero',
          },
          phone: '992-658-046',
          picture: {
            large: 'https://randomuser.me/api/portraits/women/15.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/women/15.jpg',
          },
        },
      ],
    });
    expect(newState).toEqual(expectedState);
  });
});
