import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReduxCounter } from './ReduxCounter';
import { Provider } from 'react-redux';
// This is a bad idea because the store is global, so "increment again" will fail
// import { store } from "./reduxToolkitStore";
import { createStore } from './reduxToolkitStore';

test('increment', () => {
  // need to wrap the component in a provider and give it a store
  const store = createStore();
  render(
    <Provider store={store}>
      <ReduxCounter />
    </Provider>
  );

  const counter = screen.getByRole('contentinfo');
  expect(counter).toHaveTextContent('0');

  const addButton = screen.getByText(/Increment/i);
  fireEvent.click(addButton);

  expect(counter).toHaveTextContent('1');
});

test('increment again', () => {
  // shorter way of doing it... don't need to run createStore on a separate line
  render(
    <Provider store={createStore()}>
      <ReduxCounter />
    </Provider>
  );

  const counter = screen.getByRole('contentinfo');
  expect(counter).toHaveTextContent('0');

  const addButton = screen.getByText(/Increment/i);
  fireEvent.click(addButton);

  expect(counter).toHaveTextContent('1');
});
