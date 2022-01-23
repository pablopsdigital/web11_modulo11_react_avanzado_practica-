import './NoResultsFound.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

function NoResultsFound({ ...props }) {
  return (
    <div id="noresultsfound">
      <div className="contect">
        <div className="emoji">😞</div>
        <h1>No announcement yet</h1>
        <p>Do you want to create the first one?</p>
      </div>
      <Link to="/adverts/new">
        <Button>Create advert</Button>
      </Link>
    </div>
  );
}
export default NoResultsFound;
