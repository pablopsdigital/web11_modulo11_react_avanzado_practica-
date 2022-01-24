import './Alert.scss';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { resetError } from '../../redux/actions';

function Alert({ ...props }) {
  const dispatch = useDispatch();
  const handlerClick = () => {
    dispatch(resetError());
  };

  return (
    <div onClick={handlerClick} className="alert">
      <p>{props.children}</p>
      <div className="close">
        <AiOutlineCloseCircle className="icon" />
      </div>
    </div>
  );
}

export default Alert;

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
