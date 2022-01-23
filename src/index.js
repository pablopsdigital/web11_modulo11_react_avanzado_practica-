import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import CustomLocalStorageManager from './utils/CustomLocalStorageManager';
import './index.scss';
import { setAuthorizationHeader } from './services/ApiClient';

//Read data localStorage
let accessToken = null;
if (CustomLocalStorageManager.getItem('token')) {
  accessToken = CustomLocalStorageManager.getItem('token');
  //Config Header axios client
  setAuthorizationHeader(accessToken);
}

ReactDOM.render(
  <React.StrictMode>
    {/*Send info initial token in localStorage,*/}
    <App hasAccessToken={!!accessToken} />
  </React.StrictMode>,
  document.getElementById('root')
);
