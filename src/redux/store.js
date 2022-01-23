import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import * as authService from '../pages/LoginPage/LoginService';
import * as advertsService from '../pages/AdvertsPage/AdvertsService';

import { authReducer } from './user/userReducers';
import { advertsReducer } from './advert/advertReducers';

export const defaultState = {
  auth: false,
  adverts: {
    loaded: false,
    data: []
  },
  ui: {
    isLoading: false,
    error: null
  }
};

//Combine reducers
function combinedReducer(state = defaultState, action) {
  return {
    auth: authReducer(state.auth, action),
    adverts: advertsReducer(state.adverts, action)
  };
}

const api = { authService, advertsService };

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
    combineReducers({ ...combinedReducer, router: connectRouter(history) }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;
