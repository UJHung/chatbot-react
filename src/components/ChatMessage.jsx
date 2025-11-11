import ReactMarkdown from "react-markdown";
import { useState } from "react";

import LoadingIcon from "./LoadingIcon";
import { IconCopy, IconCheck } from "@tabler/icons-react";

const ChatMessage = ({ message }) => {
  const [clicked, setClicked] = useState(false);

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

          {message.role === "model" && (
            <div className="action-buttons">
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(message.text);
                  setClicked(true);
                  setTimeout(() => setClicked(false), 1500);
                }}
              >
                {clicked ? <IconCheck size={16} /> : <IconCopy size={16} />}
                {clicked ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
