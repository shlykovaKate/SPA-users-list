import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { UsersState } from './types/types';

import App from './App';

const mockStore = configureMockStore([thunk]);

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
    rule: '',
  },
};

describe('<App />', () => {
  it('should work', () => {
    const store = mockStore(initialState);
    render(<Provider store={store}><App /></Provider>);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toEqual(2);
  });
});
