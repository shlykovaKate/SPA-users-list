import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import Rating from './Rating';
import { initialState } from '../../__mock__/mockedStore';
import reducer from '../users/usersSlice';
import { RootState } from '../../app/store';

const mockStore = configureMockStore();

describe('<Rating />', () => {
  it('should work', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}><Rating id="589b4db1-0318-4d0d-8880-a1e2f01a09f4" /></Provider>,
    );
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('value')).toEqual('0');
  });

  it('changing the rating value', () => {
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
    render(<Provider store={store}><Rating id="589b4db1-0318-4d0d-8880-a1e2f01a09f4" /></Provider>);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement.getAttribute('value')).toEqual('0');
    fireEvent.change(inputElement, { target: { value: '-3' } });
    expect(inputElement.getAttribute('value')).toEqual('-3');
  });

  it('changing the rating value to some letters', () => {
    const rootReducer = combineReducers({ users: reducer });
    const initialStateNew: RootState = {
      ...initialState,
      users: {
        ...initialState.users,
        sorting: { rule: 'DSC', columnName: 'rating' },
      },
    };
    const store = createStore(rootReducer, initialStateNew);
    render(<Provider store={store}><Rating id="589b4db1-0318-4d0d-8880-a1e2f01a09f4" /></Provider>);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement.getAttribute('value')).toEqual('0');
    fireEvent.change(inputElement, { target: { value: 'gh' } });
    expect(inputElement.getAttribute('value')).toEqual('0');
  });
});
