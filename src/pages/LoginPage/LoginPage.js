import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import './LoginPage.scss';
import { ReactComponent as Brand } from '../../images/svg/brand.svg';
import Alert from '../../components/Alert/Alert';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, resetError } from '../../redux/actions';
import { getIsLogged, getUi } from '../../redux/selectors';

function LoginPage({ history, ...props }) {
  const auth = useSelector(getIsLogged);
  const { isLoading, error } = useSelector(getUi);

  useEffect(() => {
    if (auth === true) {
      history.push('/adverts');
    }
  }, [auth, history]);

  //State for inputs values
  const [inputsValuesState, setInputsValue] = useState({
    email: '',
    password: '',
    rememberme: false
  });

  const handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    const name = input.name;

    setInputsValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const dispatch = useDispatch();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(authLogin(inputsValuesState));
  };

  return (
    <div id="loginPage">
      <div className="brand-container">
        <Brand className="brand-img" alt="brand" />
      </div>
      <div className="content">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={inputsValuesState.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={inputsValuesState.password}
            onChange={handleChange}
          />
          <br />
          <label>
            <input
              type="checkbox"
              name="rememberme"
              checked={inputsValuesState.rememberme}
              onChange={handleChange}
            />{' '}
            Remenber me
          </label>
          <br />
          <Button
            type="submit"
            disabled={isLoading || !inputsValuesState.email || !inputsValuesState.password}
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
      {isLoading && <SpinnerLoading />}
      {error && <Alert className="loginPage-error">{error.message}</Alert>}
    </div>
  );
}

export default LoginPage;
