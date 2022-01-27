import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NewAdvertPage from './NewAdvertPage';

describe('NewAdvertPage', () => {
  test('snapshot NewAdvertPage', () => {
    const store = {
      getState: () => ({
        auth: false,
        adverts: {
          loaded: false,
          data: [],
          tags: []
        },
        ui: {
          isLoading: false,
          error: null
        },
        filters: {}
      }),
      subscribe: () => {},
      dispatch: () => {}
    };
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <NewAdvertPage />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
