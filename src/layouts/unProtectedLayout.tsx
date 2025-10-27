import { useLocation } from 'react-router-dom';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import AppRoutes from '../routes/appRoutes';
import Loader from '../components/loader/loader';

const UnProtectedLayout = () => {
  const location = useLocation();

  // Check if path is one of the auth pages
  const isAuthPage = location.pathname === '/auth/signin' || location.pathname === '/auth/signup';

  return (
    <>
      <Loader />
      {!isAuthPage && <Header />}
      <AppRoutes />
      {!isAuthPage && <Footer />}
    </>
  );
};

export default UnProtectedLayout;
