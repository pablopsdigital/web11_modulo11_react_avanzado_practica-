import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Layout({ children, ...props }) {
  return (
    <div>
      <Navbar {...props} />
      <div className="container">
        <main className="layout-main bordered">
          <section className="layout-content">{children}</section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
