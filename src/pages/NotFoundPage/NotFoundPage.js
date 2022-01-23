import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../../components/Button/Button';
import Layout from '../../containers/Layout/Layout';
import './NotFoundPage.scss';

function NotFoundPage({ ...props }) {
  return (
    <Layout {...props}>
      <section id="not-fount-page" className="container">
        <h1>401</h1>
        <h2>Page not found</h2>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </section>
    </Layout>
  );
}

export default NotFoundPage;
