import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('LoginPage', () => {
  const mockStore = {
    auth: false,
    isLoading: false,
    error: null,
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
  const email = 'username';
  const password = '1234';

  const authLogin = jest.fn().mockResolvedValue({ email, password });
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

    // console.log(debug);

    //Select elements
    const emailInput = getByLabelText(/email/);
    const passwordInput = getByLabelText(/password/);
    const remembermeInput = getByLabelText(/Rememberme/);
    const buttonSubmit = getByRole('button');
    //Send event
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(remembermeInput, { target: { value: true } });

    fireEvent.click(buttonSubmit);
    //Check Result
    expect(authLogin).toHaveBeenCalledWith({ email, password });
  });
});
