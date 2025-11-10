import { useState } from "react";

import {
  IconX,
  IconMessageChatbotFilled,
  IconMinus,
} from "@tabler/icons-react";
import ChatForm from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
import useChat from "./hook/useChat";

const App = () => {
  const { isLoading, chatHistory, chatBodyRef, handleSendMessage } = useChat();
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        className="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <IconMessageChatbotFilled className="icon-chatbot" />
        <IconX className="icon-close" />
      </button>

      <div className={`chatbot-popup ${showChatbot ? "show" : ""}`}>
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <IconMessageChatbotFilled />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            className="button-minimize"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            <IconMinus size={16} />
          </button>
        </div>

        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="welcome-message">
            <div className="welcome-icon">
              <IconMessageChatbotFilled size="24" />
            </div>
            <h3>Hello, What can I help you today?</h3>
            <p>
              Choose a prompt below or type your own message to get started.
            </p>
            <div className="example-prompts">
              <button
                className="example-prompt"
                onClick={() => {
                  handleSendMessage(
                    "Tell me something random and interesting!"
                  );
                }}
              >
                Tell me something random and interesting!
              </button>
              <button
                className="example-prompt"
                onClick={() => {
                  handleSendMessage("Give me a little fortune for today!");
                }}
              >
                Give me a little fortune for today!
              </button>
            </div>
          </div>

          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm
            showChatbot={showChatbot}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
