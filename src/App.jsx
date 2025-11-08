import { useEffect, useRef, useState } from "react";

import { IconMessageChatbotFilled, IconChevronDown } from "@tabler/icons-react";
import ChatForm from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  const updateHistory = (botText) => {
    setChatHistory((prevHistory) => {
      // Remove the last "Thinking..." message
      const newHistory = prevHistory.filter(
        (msg, index) =>
          !(index === prevHistory.length - 1 && msg.text === "Thinking...")
      );

      // Add the actual bot response
      return [...newHistory, { role: "model", text: botText }];
    });
  };

  const generateBotResponse = async (history) => {
    // Placeholder for bot response generation logic
    console.log(history);

    history = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        console.error(data.error?.message || "Failed to get bot response");
        return;
      }

      console.log("Bot response data:", data);

      // Extract bot response text from Gemini API response
      const botText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      updateHistory(botText);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  useEffect(() => {
    // Scroll to bottom when chatHistory updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <IconMessageChatbotFilled />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button>
            <IconChevronDown />
          </button>
        </div>

        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <div className="message-content">
              <p>Hello! How can I assist you today?</p>
            </div>
          </div>

          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
