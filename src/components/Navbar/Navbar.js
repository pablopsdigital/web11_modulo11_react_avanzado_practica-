import './Navbar.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import { ReactComponent as Brand } from '../../images/svg/brand.svg';
import { Link, NavLink } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from '../../redux/selectors';
import { authLogout } from '../../redux/actions';

function Navbar({ search, ...props }) {
  const auth = useSelector(getIsLogged);

  //Modal control
  const [modalConfirm, setConfirm] = useState(false);
  const handleConfirm = () => {
    setConfirm(modalConfirm ? false : true);
  };

  //Control logout
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authLogout());
  };

  return (
    <>
      <nav id="navbar" className="navigation">
        <div className="menu-icon"></div>
        <div className="navigation container">
          <div className="brand-container">
            <Link to="/">
              <Brand className="brand-img" alt="brand"></Brand>
            </Link>
          </div>
          <div className="nav-options">
            <NavLink exact to="/adverts" activeClassName="link-active">
              Adverts
            </NavLink>
            <NavLink exact to="/adverts/new" activeClassName="link-active">
              New Advert
            </NavLink>
            {auth ? (
              <>
                <Button onClick={handleConfirm}>Log out</Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="login-button">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {modalConfirm && (
        <ConfirmDialog
          title={'Sure you want to log out?'}
          onConfirm={handleLogout}
          onClose={handleConfirm}
        />
      )}
    </>
  );
}

export default Navbar;
