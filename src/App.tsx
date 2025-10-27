// App.tsx
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchUserProfile } from "./redux/authSlice";
import Layout from './layouts/layout'
import { motion } from "framer-motion";
import Cookies from "js-cookie";

// Global Styles
import './styles/global.css'
import SessionWatcher from "./utils/sessionWatcher";

function App() {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.user);

  const token = Cookies.get('authToken')

  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile, token]);

  return (
    <>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3 }}
      >
        
        <SessionWatcher />
        <Layout />

      </motion.main>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
