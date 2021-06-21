import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import SearchInput from './SearchInput';
import { initialState } from '../../__mock__/mockedStore';
import reducer from '../users/usersSlice';

const mockStore = configureMockStore();

describe('<SearchInput />', () => {
  it('should work', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}><SearchInput /></Provider>,
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeTruthy();
  });

  it('changing the input value', () => {
    const rootReducer = combineReducers({ users: reducer });
    const store = createStore(rootReducer, initialState);
    render(<Provider store={store}><SearchInput /></Provider>);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement.getAttribute('value')).toEqual('');
    fireEvent.change(inputElement, { target: { value: 'alex' } });
    expect(inputElement.getAttribute('value')).toEqual('alex');
  });

  it('changing the input value to some spaces', () => {
    const store = mockStore(initialState);
    render(<Provider store={store}><SearchInput /></Provider>);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement.getAttribute('value')).toEqual('');
    fireEvent.change(inputElement, { target: { value: '   ' } });
    expect(inputElement.getAttribute('value')).toEqual('');
  });
});
