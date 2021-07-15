import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import Rating from './Rating';
import initialState from '../../__mock__/mockedStore';
import reducer from '../users/usersSlice';
import { RootState } from '../../app/store';

const mockStore = configureMockStore();

describe('<Rating />', () => {
  it('should work', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Rating
          id="589b4db1-0318-4d0d-8880-a1e2f01a09f4"
          min={-4}
          max={4}
        />
      </Provider>,
    );
    const starsBlock = screen.getByTestId('stars');
    expect(starsBlock).toBeTruthy();
    const stars = starsBlock.querySelectorAll('[data-rating]');
    expect(stars.length).toEqual(9);
  });

  it('changing the rating value, when we have sorting and filter', () => {
    const rootReducer = combineReducers({ users: reducer });
    const initialStateNew: RootState = {
      ...initialState,
      users: {
        ...initialState.users,
        sorting: { rule: 'ASC', columnName: 'rating' },
        searchText: {
          name: '',
          login: '',
          email: '',
          phone: '',
          rating: '0',
        },
      },
    };
    const store = createStore(rootReducer, initialStateNew);
    render(
      <Provider store={store}>
        <Rating
          id="589b4db1-0318-4d0d-8880-a1e2f01a09f4"
          min={-4}
          max={4}
        />
      </Provider>,
    );
    const starsBlock = screen.getByTestId('stars');
    const stars = starsBlock.querySelectorAll('[data-rating]');
    expect(starsBlock.getAttribute('data-stars')).toEqual('0');
    fireEvent.click(stars[8]);
    expect(starsBlock.getAttribute('data-stars')).toEqual('4');
  });

  it('changing the rating value, when we have sorting with columnName "rating" and rule "DESC"', () => {
    const rootReducer = combineReducers({ users: reducer });
    const initialStateNew: RootState = {
      ...initialState,
      users: {
        ...initialState.users,
        sorting: { rule: 'DESC', columnName: 'rating' },
      },
    };
    const store = createStore(rootReducer, initialStateNew);
    render(
      <Provider store={store}>
        <Rating
          id="589b4db1-0318-4d0d-8880-a1e2f01a09f4"
          min={-4}
          max={4}
        />
      </Provider>,
    );
    const starsBlock = screen.getByTestId('stars');
    const stars = starsBlock.querySelectorAll('[data-rating]');
    expect(starsBlock.getAttribute('data-stars')).toEqual('0');
    fireEvent.click(stars[2]);
    expect(starsBlock.getAttribute('data-stars')).toEqual('-2');
  });
});
