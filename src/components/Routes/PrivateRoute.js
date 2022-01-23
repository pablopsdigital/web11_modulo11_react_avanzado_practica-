import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const PrivateRoute = (props) => {
  const { userIsLoggedState } = useContext(AuthContext);
  return userIsLoggedState ? (
    <Route {...props} />
  ) : (
    <Route>
      {/*Redirect to login to send back to the source path (from) this time logged in*/}
      {({ location }) => <Redirect to={{ pathname: '/login', state: { from: location } }} />}
    </Route>
  );
};

export default PrivateRoute;
