import { motion, AnimatePresence } from "framer-motion";
import styles from "./testBot.module.scss";
import useTestBot from "./useTestBot";
import { useSearchParams } from "react-router-dom";

interface ModalProps {
  handleClose: () => void;
}

const TestBot: React.FC<ModalProps> = ({ handleClose }) => {
  const {
    messages,
    input,
    setInput,
    handleChat,
    loading,
  } = useTestBot();

  const [searchParams] = useSearchParams();
  const botName = searchParams.get("name");


  return (
    <AnimatePresence>
      <motion.section
        className={styles.testBot}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.botWrapper}
          initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className={styles.header}>
            <h3>{botName}</h3>
            <motion.span
              className={styles.closeBtn}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
            >
              <i className="fa-regular fa-xmark"></i>
            </motion.span>
          </div>

          <div className={styles.chatArea}>
            {messages.length === 0 && (
              <div className={styles.placeholder}>Start chatting with your bot!</div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.bot}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>{msg.text}</p>
              </motion.div>
            ))}

            {loading && (
              <div className={styles.typing}>
                <span></span><span></span><span></span>
              </div>
            )}
          </div>

          <form
            className={styles.inputArea}
            onSubmit={(e) => {
              e.preventDefault();
              handleChat();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button type="submit" disabled={!input.trim() || loading}>
              {loading ? "..." : <i className="fa-regular fa-paper-plane"></i>}
            </button>
          </form>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default TestBot;
