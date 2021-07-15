import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import UserCard from './UserCard';
import initialState from '../../__mock__/mockedStore';
import reducer from './usersSlice';

const mockStore = configureMockStore();

describe('<UserCard />', () => {
  it('should work', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/users/2d049a1e-4935-4114-88b1-085aee6f6699']}>
          <Route path="/users/:id">
            <UserCard />
          </Route>
        </MemoryRouter>
      </Provider>,
    );
    const userCard = screen.getByTestId('user-card');
    expect(userCard).toBeTruthy();
  });

  it('changing rating of user', () => {
    const rootReducer = combineReducers({ users: reducer });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/users/2d049a1e-4935-4114-88b1-085aee6f6699']}>
          <Route path="/users/:id">
            <UserCard />
          </Route>
        </MemoryRouter>
      </Provider>,
    );
    const starsBlock = screen.getByTestId('stars');
    const stars = starsBlock.querySelectorAll('[data-rating]');
    expect(starsBlock.getAttribute('data-stars')).toEqual('0');
    fireEvent.click(stars[7]);
    expect(starsBlock.getAttribute('data-stars')).toEqual('3');
  });
});
