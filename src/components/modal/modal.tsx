import { motion, AnimatePresence } from "framer-motion"; //
import React, { type ReactNode } from "react";
import styles from './modal.module.scss'
import ReactDOM from "react-dom";

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, handleClose, children }) => {

    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {showModal && (
                <>
                    <motion.div
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    <motion.div
                        className={styles.smallModalContent}
                        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {children}

                        <motion.span
                            className={styles.closeBtn}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClose}
                        >
                            <i className="fa-regular fa-xmark mt-2"></i>
                        </motion.span>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )

}

export default Modal