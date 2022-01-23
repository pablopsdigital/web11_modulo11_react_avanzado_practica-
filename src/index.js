import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import CustomLocalStorageManager from './utils/CustomLocalStorageManager';
import './index.scss';
import { setAuthorizationHeader } from './services/ApiClient';
import configureStore from './redux/store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

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
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
