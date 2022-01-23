import './Alert.scss';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
//Protypes
Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  color: PropTypes.string
};

Alert.defaultProps = {
  title: 'Alert',
  message: 'An error has occurred',
  color: 'gray'
};

function Alert({ ...props }) {
  return (
    <div onClick={props.onClick} className="alert">
      <p>{props.children}</p>
      <div className="close">
        <AiOutlineCloseCircle className="icon" />
      </div>
    </div>
  );
}

export default Alert;
