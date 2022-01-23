import './Footer.scss';
import { ReactComponent as Brand } from '../../images/svg/brand.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as FacebookIcon } from '../../images/svg/icon-facebook.svg';
import { ReactComponent as YoutubeIcon } from '../../images/svg/icon-youtube.svg';
import { ReactComponent as TwitterIcon } from '../../images/svg/icon-twitter.svg';
import { ReactComponent as InstagramIcon } from '../../images/svg/icon-instagram.svg';

function Footer(props) {
  return (
    <footer id="footer">
      <div className="container">
        <div className="grid">
          <section className="brand">
            <div className="brand-container">
              <Link to="/">
                <Brand className="brand-img" alt="brand"></Brand>
              </Link>
            </div>
            <p className="brand-tagline">&copy; Todos los derechos reservados</p>
          </section>

          <section className="links1">
            <nav>
              <ul>
                <li>
                  <Link to="404.html">About us</Link>
                </li>
                <li>
                  <Link to="404.html">Contact</Link>
                </li>
                <li>
                  <Link to="404.html">NodePop PRO</Link>
                </li>
                <li>
                  <Link to="404.html">Press</Link>
                </li>
              </ul>
            </nav>
          </section>

          <section className="links2">
            <nav>
              <ul>
                <li>
                  <Link to="404.html">Carrers</Link>
                </li>
                <li>
                  <Link to="404.html">Support</Link>
                </li>
                <li>
                  <Link to="404.html">Privacy policy</Link>
                </li>
                <li>
                  <Link to="404.html">Cookies</Link>
                </li>
              </ul>
            </nav>
          </section>

          <section>
            <p>Follow us:</p>
            <nav>
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/keepcoding.training/">
                    <FacebookIcon className="social-icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCz-oGx94gqD1lICJQZGniLA">
                    <YoutubeIcon className="social-icon" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/intent/follow?screen_name=KeepCoding_">
                    <TwitterIcon className="social-icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/keepcoding_es/?hl=es">
                    <InstagramIcon className="social-icon" />
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
