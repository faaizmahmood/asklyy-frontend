import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "../redux/hooks";
import handleLogout from "./logout";
import Modal from "../components/modal/modal";

const SessionWatcher = () => {
  const { profile, loading } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState<{ title: string; message: string } | null>(null);
  const hasProfileLoadedOnce = useRef(false);

  // Track that profile has been loaded at least once
  useEffect(() => {
    if (!loading) {
      hasProfileLoadedOnce.current = true;
    }
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("authToken");

      // Wait until profile is loaded once
      if (!hasProfileLoadedOnce.current) return;

      // Only show modal if user had a token before (i.e., session expired)
      if (!token && profile) {
        setModalData({
          title: "Session Expired",
          message: "Your session expired. Please log in again.",
        });
        return;
      }

      if (profile === null && token) {
        setModalData({
          title: "Session Invalid",
          message: "We couldn't verify your profile. Please login again.",
        });
        return;
      }

      if (profile?.status === "blocked") {
        setModalData({
          title: "Account Blocked",
          message: "Your account has been blocked. Contact support.",
        });
        return;
      }

      if (profile?.status === "deleted") {
        setModalData({
          title: "Account Deleted",
          message: "Your account has been deleted.",
        });
        return;
      }

      // Everything is fine
      setModalData(null);
    }, 10000);

    return () => clearInterval(interval);
  }, [profile, loading]);

  if (!modalData) return null;

  return (
    <Modal showModal={true} handleClose={() => null}>
      <h2>{modalData.title}</h2>
      <p>{modalData.message}</p>
      <div className="mt-3">
        <button className="btn-filled" onClick={() => handleLogout(dispatch)}>
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default SessionWatcher;
