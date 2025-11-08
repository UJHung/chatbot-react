import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message }) => {
  return (
    <div className={`message ${message.role}-message`}>
      <div className="message-content">
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
