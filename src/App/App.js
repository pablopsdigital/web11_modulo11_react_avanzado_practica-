import './App.css';
import React from 'react';
import AdvertsPage from '../pages/AdvertsPage/AdvertsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NewAdvertPage from '../pages/NewAdvertPage/NewAdvertPage';
import AdvertPage from '../pages/AdvertPage/AdvertPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '../components/Routes/PrivateRoute';

//Receives from index.js the information whether it has a token or not.
function App({ ...props }) {
  //Send functions change state login and logout to buttons
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/adverts/new" component={NewAdvertPage} />
          <PrivateRoute exact path="/adverts/:advertId" component={AdvertPage} />
          <PrivateRoute exact path="/adverts" component={AdvertsPage} />
          <Route exact path="/login">
            {({ ...routerProps }) => <LoginPage {...routerProps} />}
          </Route>
          <PrivateRoute exact path="/">
            <Redirect to="/adverts" />
          </PrivateRoute>
          <Route path="/404" component={NotFoundPage} />
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
