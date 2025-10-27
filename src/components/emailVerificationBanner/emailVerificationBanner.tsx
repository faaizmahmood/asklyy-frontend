import Modal from '../modal/modal';
import styles from './emailVerificationBanner.module.scss';
import useEmailVerificationBanner from './useEmailVerificationBanner';
import doneImg from '../../assets/imgs/done.gif';
import { useAppSelector } from '../../redux/hooks';

const EmailVerificationBanner = () => {
  const { handleSendVerificationEmail, loading, openModal, setOpenModal } = useEmailVerificationBanner();
  const { loading: userLoading, profile } = useAppSelector((state) => state.user);

  // Only show banner if user is loaded AND not verified
  const showBanner = !userLoading && profile && !profile.verified;

  return (
    <>
      {showBanner && (
        <div className={styles.emailVerificationBanner}>
          <p>Verify your email address</p>
          <p
            onClick={!loading ? handleSendVerificationEmail : undefined}
            style={{
              cursor: loading ? 'not-allowed' : 'pointer',
              textDecoration: 'underline',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Sending...' : 'Send email'}
          </p>
        </div>
      )}

      <Modal showModal={openModal} handleClose={() => setOpenModal(false)}>
        <div className="text-center">
          <img src={doneImg} width={80} alt="done" />
        </div>
        <h3 className="mt-3">Email Sent! Check inbox.</h3>
      </Modal>
    </>
  );
};

export default EmailVerificationBanner;
