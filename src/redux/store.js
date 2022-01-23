import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as reducers from './reducers';
import thunk from 'redux-thunk';

import * as auth from '../pages/LoginPage/LoginService';
import * as adverts from '../pages/AdvertsPage/AdvertsService';

const api = { auth, adverts };

function logger(store) {
  return function (next) {
    return function (action) {
      console.log('*****Dispatching Action: ', action);
      const result = next(action);
      console.log('*****New State: ', store.getState());
      return result;
    };
  };
}

const configureStore = (preloadedState, { history }) => {
  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument({ api, history }),
    logger
  ];

  const store = createStore(
    combineReducers({ ...reducers, router: connectRouter(history) }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;
