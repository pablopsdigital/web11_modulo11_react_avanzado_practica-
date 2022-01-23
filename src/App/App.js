import './App.css';
import React, { useState } from 'react';
import AdvertsPage from '../pages/AdvertsPage/AdvertsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { logout } from '../pages/LoginPage/LoginService';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NewAdvertPage from '../pages/NewAdvertPage/NewAdvertPage';
import AdvertPage from '../pages/AdvertPage/AdvertPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { AuthContextProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/Routes/PrivateRoute';

//Receives from index.js the information whether it has a token or not.
function App({ hasAccessToken, ...props }) {
  //Define state autentication state
  const [userIsLoggedState, setIsLogged] = useState(hasAccessToken);

  //Functions change states login and logout
  const handleLogin = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  //Send functions change state login and logout to buttons
  return (
    <BrowserRouter>
      <AuthContextProvider value={{ userIsLoggedState, handleLogout, handleLogin }}>
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
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
