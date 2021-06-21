import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import Users from './Users';
import { initialState } from '../../__mock__/mockedStore';
import reducer from './usersSlice';

const mockStore = configureMockStore();

describe('<Users />', () => {
  it('should work', () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Users />
        </Router>
      </Provider>,
    );
    const usersListElement = screen.getByTestId('grid-element');
    expect(usersListElement).toBeTruthy();
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toEqual(6);
  });

  it('removing user', () => {
    const rootReducer = combineReducers({ users: reducer });
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Users />
        </Router>
      </Provider>,
    );
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toEqual(6);
    const removeButton = screen.getAllByRole('button')[2];
    fireEvent.click(removeButton);
    cleanup();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Users />
        </Router>
      </Provider>,
    );
    const newImgs = screen.getAllByRole('img');
    expect(newImgs.length).toEqual(5);
  });
});
