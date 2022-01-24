import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../redux/selectors';

const PrivateRoute = (props) => {
  const auth = useSelector(getIsLogged);

  return auth ? (
    <Route {...props} />
  ) : (
    <Route>
      {/*Redirect to login to send back to the source path (from) this time logged in*/}
      {({ location }) => <Redirect to={{ pathname: '/login', state: { from: location } }} />}
    </Route>
  );
};

export default PrivateRoute;
