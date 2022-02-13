import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import { authLogin } from '../../redux/actions';
jest.mock('../../redux/actions');
// console.log('auth', authLogin);

describe('LoginPage', () => {
  const mockStore = {
    getState: () => ({
      auth: false,
      adverts: {
        loaded: false,
        data: [],
        tags: []
      },
      ui: {
        isLoading: false,
        error: null
      },
      filters: {}
    }),
    subscribe: () => {},
    dispatch: () => {}
  };

  //Mock data inputs
  const email = 'username';
  const password = '1234';
  const rememberme = true;

  test('snapshot', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('should call authLogin', () => {
    const { getByLabelText, getByRole, debug } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // console.log('debug', debug);

    //Select elements
    const emailInput = getByLabelText(/email/);
    const passwordInput = getByLabelText(/password/);
    const remembermeInput = getByLabelText(/Rememberme/);
    const buttonSubmit = getByRole('button');

    //Send event
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(remembermeInput);
    fireEvent.click(buttonSubmit);

    //Check call to action
    expect(authLogin).toHaveBeenCalledWith({ email, password, rememberme });
  });
});
