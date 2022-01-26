import AdvertisementCard from '../../components/AdvertisementCard/AdvertisementCard';
import Layout from '../../containers/Layout/Layout';
import './AdvertsPage.scss';
import { useEffect } from 'react';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import Alert from '../../components/Alert/Alert';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdverts, uiResetError } from '../../redux/actions';
import { getAdverts, getUi } from '../../redux/selectors';

function AdvertsPage({ ...props }) {
  //Data
  //=======================================================================
  const dispatch = useDispatch();
  const advertisements = useSelector(getAdverts);
  const { isLoading, error } = useSelector(getUi);

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch, advertisements]);

  //Filters
  //======================================================================

  //Return
  //=======================================================================
  return (
    <Layout {...props}>
      <FiltersForm />
      <section id="adverts-page">
        <div className="container">
          {advertisements.length ? (
            <>
              <div className="header">
                <h2>The latest publications</h2>
                <p>Total results: {advertisements.length}</p>
              </div>
              <ul className="body">
                {advertisements.map((advertisement) => (
                  <AdvertisementCard key={advertisement.id} advertisement={advertisement} />
                ))}
              </ul>
            </>
          ) : (
            !isLoading && <NoResultsFound />
          )}
        </div>
      </section>
      {isLoading && <SpinnerLoading />}
      {error && (
        <Alert onClick={dispatch(uiResetError())} className="loginPage-error">
          {error.message}
        </Alert>
      )}
    </Layout>
  );
}
export default AdvertsPage;
