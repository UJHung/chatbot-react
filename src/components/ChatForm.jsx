import { useRef, useEffect } from "react";

import { IconArrowUp } from "@tabler/icons-react";

const ChatForm = ({
  showChatbot,
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = inputRef.current.value.trim();
    if (!input) return;

    inputRef.current.value = "";

    // Update chat history with the new user message
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: input },
    ]);

    setTimeout(() => {
      // Update chat history with bot "Thinking..." message
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: "Thinking..." },
      ]);

      // Call generateBotResponse with updated chat history
      generateBotResponse([...chatHistory, { role: "user", text: input }]);
    }, 500);
  };

  useEffect(() => {
    // Clear input field when chatbot is shown
    if (showChatbot) {
      inputRef.current.value = "";
    }
  }, [showChatbot]);

  return (
    <form action="#" className="chat-form" onSubmit={handleSubmit}>
      <input
        name="message"
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="message-input"
        required
      />
      <button type="submit" className="send-button">
        <IconArrowUp />
      </button>
    </form>
  );
};

export default ChatForm;
