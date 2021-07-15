import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import configureMockStore from 'redux-mock-store';
import initialState from '../../__mock__/mockedStore';
import reducer from '../users/usersSlice';
import { RootState } from '../../app/store';
import Sorting from './Sorting';

const mockStore = configureMockStore();

describe('<Sorting />', () => {
  it('should work', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Sorting columnName="name" />
        <Sorting columnName="email" />
      </Provider>,
    );
    const selectElements = screen.getAllByRole('combobox');
    expect(selectElements).toBeTruthy();
    expect(selectElements.length).toEqual(2);
  });

  it("changing the sorting rule to 'DESC'", () => {
    const rootReducer = combineReducers({ users: reducer });
    const initialStateNew: RootState = {
      ...initialState,
      users: {
        ...initialState.users,
        sorting: { rule: 'ASC', columnName: 'name' },
      },
    };
    const store = createStore(rootReducer, initialStateNew);
    render(
      <Provider store={store}>
        <Sorting columnName="name" />
      </Provider>,
    );
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'DESC' } });
    expect(document.querySelector('select')!.value).toEqual('DESC');
  });

  it(`changing the sorting rule to 'ASC' for name column,
  then changing the rule to 'DESC' for email column`, () => {
    const rootReducer = combineReducers({ users: reducer });
    const store = createStore(rootReducer, initialState);
    render(
      <Provider store={store}>
        <Sorting columnName="name" />
        <Sorting columnName="email" />
      </Provider>,
    );
    const sortingNameElement = screen.getAllByRole('combobox')[0];
    const sortingImailElement = screen.getAllByRole('combobox')[1];
    fireEvent.change(sortingNameElement, { target: { value: 'ASC' } });
    expect(document.querySelectorAll('select')[0].value).toEqual('ASC');
    expect(document.querySelectorAll('select')[1].value).toEqual('');
    fireEvent.change(sortingImailElement, { target: { value: 'DESC' } });
    expect(document.querySelectorAll('select')[0].value).toEqual('');
    expect(document.querySelectorAll('select')[1].value).toEqual('DESC');
  });
});
