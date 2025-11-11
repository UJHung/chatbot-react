import { useState } from "react";
import {
  IconX,
  IconMessageChatbotFilled,
  IconMinus,
  IconTrash,
  IconSparkles,
} from "@tabler/icons-react";
import ChatForm from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
import PromptLibrary from "./components/PromptLibrary";
import ChatIcon from "./components/ChatIcon";
import useChat from "./hook/useChat";
import { defaultPrompts } from "./data/prompts";

const App = () => {
  const {
    isLoading,
    chatHistory,
    chatBodyRef,
    handleSendMessage,
    handleStopGeneration,
    clearChat,
  } = useChat();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        className="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <ChatIcon className="icon-chatbot" size={28} color="#ffffff" />
        <IconX className="icon-close" />
      </button>

      <div className={`chatbot-popup ${showChatbot ? "show" : ""}`}>
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            {/* <IconMessageChatbotFilled /> */}
            <ChatIcon className="icon-chatbot" size={20} color="#4c6ef5" />
            <h2 className="logo-text">AskLaw</h2>
          </div>
          <div className="header-actions">
            <button
              className="button-action"
              onClick={() => setShowPromptLibrary(true)}
              title="Quick Prompts"
            >
              <IconSparkles size={16} />
            </button>
            <button
              className="button-action"
              onClick={clearChat}
              title="Clear Chat"
            >
              <IconTrash size={16} />
            </button>
            <button
              className="button-action"
              title="Minimize"
              onClick={() => setShowChatbot((prev) => !prev)}
            >
              <IconMinus size={16} />
            </button>
          </div>
        </div>

        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          {chatHistory.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">
                <IconMessageChatbotFilled size="24" />
              </div>
              <h3>Hello, What can I help you today?</h3>
              <p>
                Choose a prompt below or type your own message to get started.
              </p>
              <div className="example-prompts">
                {defaultPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="example-prompt"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <button
                className="show-prompts-btn"
                onClick={() => setShowPromptLibrary(true)}
              >
                <IconSparkles size={18} />
                Show more prompts
              </button>
            </div>
          ) : (
            chatHistory.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))
          )}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm
            showChatbot={showChatbot}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onStopGeneration={handleStopGeneration}
          />
        </div>

        {/* Prompt Library Modal */}
        {showPromptLibrary && (
          <PromptLibrary
            onSelectPrompt={handleSendMessage}
            onClose={() => setShowPromptLibrary(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
