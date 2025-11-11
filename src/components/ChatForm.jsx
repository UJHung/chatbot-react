import { useRef, useEffect } from "react";

import { IconArrowUp, IconPlayerStopFilled } from "@tabler/icons-react";

const ChatForm = ({
  showChatbot,
  onSendMessage,
  onStopGeneration,
  isLoading,
}) => {
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
        disabled={isLoading}
      />
      {isLoading ? (
        <button
          type="button"
          className="send-button stop-button"
          onClick={onStopGeneration}
        >
          <IconPlayerStopFilled size={20} />
        </button>
      ) : (
        <button type="submit" className="send-button">
          <IconArrowUp size={20} />
        </button>
      )}
    </form>
  );
};

export default ChatForm;
