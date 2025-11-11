import { useState, useRef, useEffect } from "react";

const useChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // 更新聊天記錄（移除 "Thinking..." 並添加機器人回應）
  const updateHistory = (botText) => {
    setChatHistory((prevHistory) => {
      const newHistory = prevHistory.filter(
        (msg, index) =>
          !(index === prevHistory.length - 1 && msg.text === "Thinking...")
      );
      return [...newHistory, { role: "model", text: botText }];
    });
    setIsLoading(false);
  };

  // 生成機器人回應
  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "model",
            parts: [
              {
                text: "You are a helpful AI legal assistant specialized in U.S. law. Explain legal concepts clearly and neutrally, without giving personal opinions or legal advice.",
              },
            ],
          },
          ...formattedHistory,
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        // safetySettings: [
        //   {
        //     category: "HARM_CATEGORY_HARASSMENT", // 騷擾
        //     threshold: "BLOCK_MEDIUM_AND_ABOVE",
        //   },
        //   {
        //     category: "HARM_CATEGORY_HATE_SPEECH", // 仇恨言論
        //     threshold: "BLOCK_MEDIUM_AND_ABOVE",
        //   },
        // ],
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get bot response");
      }

      const botText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      updateHistory(botText);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      updateHistory("Sorry, something went wrong. Please try again.");
    }
  };

  // 發送訊息的統一處理函數
  const handleSendMessage = (userMessage) => {
    const message = userMessage.trim();
    if (!message || isLoading) return;

    setIsLoading(true);

    // 1. 添加用戶訊息
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: message },
    ]);

    // 2. 添加 "Thinking..." 狀態
    setTimeout(() => {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: "Thinking..." },
      ]);

      // 3. 生成機器人回應
      generateBotResponse([...chatHistory, { role: "user", text: message }]);
    }, 500);
  };

  // 清除聊天記錄
  const clearChat = () => {
    setChatHistory([]);
    setIsLoading(false);
  };

  // 自動滾動到底部
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return {
    chatHistory,
    isLoading,
    chatBodyRef,
    handleSendMessage,
    clearChat,
  };
};

export default useChat;
