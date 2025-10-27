import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiService from "../../utils/apiClient";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const useTestBot = () => {
  const [searchParams] = useSearchParams();
  const test = searchParams.get("test");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await apiService.post(`/bot/message/${test}`, { message: input });
      const reply = res.data?.reply || "No response from bot.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return {
    messages,
    input,
    setInput,
    handleChat,
    loading,
  };
};

export default useTestBot;
