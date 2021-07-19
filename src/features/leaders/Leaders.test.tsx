import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import Leaders from './Leaders';
import initialState from '../../__mock__/mockedStore';

const mockStore = configureMockStore();

describe('<Users />', () => {
  it('should work', () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Leaders />
        </Router>
      </Provider>,
    );
    const leadersListElement = screen.getByTestId('grid-leaders');
    expect(leadersListElement).toBeTruthy();
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toEqual(5);
  });
});
