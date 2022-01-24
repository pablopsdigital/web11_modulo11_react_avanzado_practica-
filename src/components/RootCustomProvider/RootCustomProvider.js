import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

const RootCustomProvider = ({ children, store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

export default RootCustomProvider;
