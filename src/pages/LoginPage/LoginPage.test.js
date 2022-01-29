import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  useState: jest.fn()
}));

const isLoading = jest.fn();
const error = jest.fn();

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
  // const authLogin = jest.fn().mockResolvedValue();
  const email = 'username';
  const password = '1234';

  test('snapshot', () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });

  test('should call authLogin', () => {
    const { getByLabelText, getByRole, debug } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage></LoginPage>
        </BrowserRouter>
      </Provider>
    );
    //Select elements
    const emailInput = getByLabelText(/email/);
    const passwordInput = getByLabelText(/password/);
    const remembermeInput = getByLabelText(/rememberme/);
    const buttonSubmit = getByRole('button');
    //Send event
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(remembermeInput, { target: { value: true } });
    fireEvent.click(buttonSubmit);
    //Check Result
    expect(authLogin).toHaveBeenCalledWith({ email, password });
  });

  // test('should reset error', () => {
  //   const error = { message: 'This is a error' };
  //   const OnResetError = jest.fn();
  //   const { getByText } = render(<LoginPage error={error} onResetError={OnResetError} />);
  //   const errorField = getByText(error.message);
  //   fireEvent.click(errorField);
  //   expect(OnResetError).toHaveBeenCalled();
  // });
});
