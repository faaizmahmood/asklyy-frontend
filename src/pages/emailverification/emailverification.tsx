import Modal from "../../components/modal/modal";
import doneImg from "../../assets/imgs/done.gif";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import apiService from "../../utils/apiClient";

const EmailVerification = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user?.profile);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null); // null = verifying, true = success, false = failed

  const handleClose = () => {
    setShowModal(false);

    if (!user) {
      navigate("/auth/signin");
    } else {
      window.location.href = "/dashboard";
    }
  };

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        setLoading(true);
        await apiService.get(`/email/verify-email/${token}`);
        setSuccess(true);
      } catch (error) {
        console.error("Email verification failed:", error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  // Determine message based on state
  let title = "Verifying Email...";
  let message = "Please wait while we verify your email.";
  let img = doneImg;

  if (success === true) {
    title = "Email Verified!";
    message = "Your email has been successfully verified.";
  } else if (success === false) {
    title = "Verification Failed";
    message = "The verification link is invalid or has expired.";
    img = ""; // or you can use a failed icon if you have one
  }

  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div className="text-center">
        {img && <img src={img} width={80} alt="status" />}
      </div>
      <h3 className="mt-3">{title}</h3>
      <p className="mt-2">{message}</p>
      {!loading && (
        <div className="mt-3">
          <button className="btn-filled" onClick={handleClose}>
            Continue
          </button>
        </div>
      )}
    </Modal>
  );
};

export default EmailVerification;
