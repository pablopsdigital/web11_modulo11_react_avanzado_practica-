import AdvertisementCard from '../../components/AdvertisementCard/AdvertisementCard';
import Layout from '../../containers/Layout/Layout';
import './AdvertsPage.scss';
import { useState, useEffect } from 'react';
import { getAdvertisements } from './AdvertsService';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import PropTypes from 'prop-types';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import Alert from '../../components/Alert/Alert';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdverts } from '../../redux/actions';
import { getAdverts } from '../../redux/selectors';

//Protypes
AdvertsPage.propTypes = {
  history: PropTypes.object.isRequired
};

function AdvertsPage({ ...props }) {
  //Data
  //=======================================================================
  const dispatch = useDispatch();
  const advertisements = useSelector(getAdverts);

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);

  //Filters
  //======================================================================

  //Return
  //=======================================================================
  return (
    <Layout {...props}>
      {/* <p>Filters Info: {JSON.stringify(filtersInfo)}</p> */}
      {/* <FiltersForm advertisements={advertisements} setFiltersInfo={setFiltersInfo} /> */}
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
            <NoResultsFound />
          )}
        </div>
      </section>
    </Layout>
  );
}
export default AdvertsPage;
