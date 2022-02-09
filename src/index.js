import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import CustomLocalStorageManager from './utils/CustomLocalStorageManager';
import './index.scss';
import { setAuthorizationHeader } from './services/ApiClient';
import configureStore from './redux/store';
import { createBrowserHistory } from 'history';
import RootCustomProvider from './components/RootCustomProvider/RootCustomProvider';

//Read data localStorage
let accessToken = null;

if (CustomLocalStorageManager.getItem('token')) {
  accessToken = CustomLocalStorageManager.getItem('token');
  //Config Header axios client
  setAuthorizationHeader(accessToken);
}

const history = createBrowserHistory();
const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  <RootCustomProvider store={store} history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RootCustomProvider>,
  document.getElementById('root')
);
