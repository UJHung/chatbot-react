import { useRef, useEffect } from "react";

import { IconArrowUp } from "@tabler/icons-react";

const ChatForm = ({ showChatbot, onSendMessage, isLoading }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = inputRef.current.value.trim();
    if (!input) return;

    inputRef.current.value = "";

    onSendMessage(input);
  };

  useEffect(() => {
    if (showChatbot) {
      inputRef.current?.focus();
    }
  }, [showChatbot]);

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        name="message"
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="message-input"
        required
      />
      <button type="submit" className="send-button" disabled={isLoading}>
        <IconArrowUp size={20} />
      </button>
    </form>
  );
};

export default ChatForm;
