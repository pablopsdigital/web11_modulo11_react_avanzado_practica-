import { Link } from 'react-router-dom';
import './AdvertisementCard.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
const { formatDistanceToNow } = require('date-fns');

//Protypes
AdvertisementCard.propTypes = {
  advertisement: PropTypes.object.isRequired
};

function AdvertisementCard({ advertisement, ...props }) {
  return (
    <li className="card">
      <Link to={`/adverts/${advertisement.id}`} className="card-link">
        <Image photo={advertisement.photo} />
        <div className="card-content">
          <p className="card-price">
            {advertisement.price}
            <span> EUR</span>
          </p>
          <h2 className="card-title">{advertisement.name}</h2>

          <div className="info-details">
            {advertisement.sale ? (
              <p className="advertisement-type background-sale">Sale</p>
            ) : (
              <p className="advertisement-type background-purchase">Purchase</p>
            )}
            <p className="date">
              Publication date:{' '}
              <time dateTime={advertisement.createdAt}>
                {formatDistanceToNow(new Date(advertisement.createdAt))}
              </time>
            </p>
          </div>
          <div className="tags-details">
            {advertisement.tags.map((tag, index) => (
              <span key={index} href="url" className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default AdvertisementCard;
