import ReactMarkdown from "react-markdown";

import LoadingIcon from "./LoadingIcon";

const ChatMessage = ({ message }) => {
  return (
    <div className={`message ${message.role}-message`}>
      {message.role == "model" && message.text == "Thinking..." ? (
        <div className="message-thinking">
          <LoadingIcon />
          <span>Thinking...</span>
        </div>
      ) : (
        <div className="message-content">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
