import './Navbar.scss';
import Button from '../Button/Button';
import { useContext, useState } from 'react';
import { ReactComponent as Brand } from '../../images/svg/brand.svg';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

function Navbar({ search, ...props }) {
  //Import AuthContext properties
  const { userIsLoggedState, handleLogout } = useContext(AuthContext);

  //Modal control
  const [modalConfirm, setConfirm] = useState(false);
  const handleConfirm = () => {
    setConfirm(modalConfirm ? false : true);
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
            {userIsLoggedState ? (
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
