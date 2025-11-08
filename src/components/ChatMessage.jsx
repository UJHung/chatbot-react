const ChatMessage = ({ message }) => {
  return (
    <div className={`message ${message.role}-message`}>
      <div className="message-content">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
