import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={`text-center py-2 mt-auto border-top ${styles.footer}`}>
      <small>&copy; {new Date().getFullYear()} Asklyy. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
