// import './Button.scss';
import PropTypes from 'prop-types';

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

function Button({ disabled, onClick, type, className, ...props }) {
  return (
    <button disabled={disabled} onClick={onClick} type={type} className={className}>
      {props.children}
    </button>
  );
}

export default Button;
