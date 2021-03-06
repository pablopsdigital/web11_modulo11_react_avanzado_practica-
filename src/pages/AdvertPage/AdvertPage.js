import Layout from '../../containers/Layout/Layout';
import './AdvertPage.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';
import { Link } from 'react-router-dom';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import Alert from '../../components/Alert/Alert';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import { AiFillDelete } from 'react-icons/ai';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdvert, loadAdvert } from '../../redux/actions';
import { getAdvert, getUi } from '../../redux/selectors';
import { useParams } from 'react-router-dom';

const { formatDistanceToNow } = require('date-fns');

function AdvertPage({ match, ...props }) {
  //Params
  const { advertId } = useParams();

  //Modal control
  const [modalConfirm, setConfirm] = useState(false);
  const handleConfirm = () => {
    setConfirm(modalConfirm ? false : true);
  };

  //Load data
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  useEffect(() => {
    dispatch(loadAdvert(advertId));
  }, [dispatch, advertId]);

  const advertisement = useSelector((state) => getAdvert(state, advertId));

  const handleDelete = (event) => {
    dispatch(deleteAdvert(advertId));
  };

  return (
    <Layout {...props}>
      <section id="advert-page">
        <div className="container">
          {advertisement ? (
            <div className="columns">
              <div className="left-column">
                <div className="content">
                  <Image photo={advertisement.photo} />
                </div>
              </div>

              <div className="right-column">
                <div className="header">
                  <Link to={''}>
                    <Button className="back-btn">
                      <ArrowIcon className="icon" />
                      Go back
                    </Button>
                  </Link>
                </div>

                <div className="content">
                  <p className="type">{advertisement.sale ? 'Sale' : 'Purchase'}</p>
                  <h1>{advertisement.name}</h1>
                  <p className="date-published">
                    Published:{' '}
                    <time dateTime={advertisement.createdAt}>
                      {formatDistanceToNow(new Date(advertisement.createdAt))}
                    </time>
                  </p>

                  <div className="tags">
                    <ul>
                      {advertisement.tags.map((tag, index) => (
                        <li key={index} href="url" className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="price-content">
                    <p>{advertisement.price} ???</p>
                    <Link to={'#'} className="cart-btn">
                      Add to cart
                    </Link>
                    <Button onClick={handleConfirm}>
                      <AiFillDelete />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NoResultsFound />
          )}
          {isLoading && <SpinnerLoading />}
          {error && <Alert className="loginPage-error">{error.message}</Alert>}
        </div>
      </section>

      {modalConfirm && (
        <ConfirmDialog
          title={'Are you want to delete this ad?'}
          onConfirm={handleDelete}
          onClose={handleConfirm}
        />
      )}
    </Layout>
  );
}

export default AdvertPage;
