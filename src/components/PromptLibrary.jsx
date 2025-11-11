import { useState } from "react";
import { promptCategories } from "../data/prompts";
import { IconX } from "@tabler/icons-react";

const PromptLibrary = ({ onSelectPrompt, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="prompt-library">
      <div className="prompt-header">
        <h3>Quick Prompts</h3>
        <button className="button-action" onClick={onClose}>
          <IconX size={16} />
        </button>
      </div>

      <div className="prompt-categories">
        {promptCategories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${
              activeCategory === index ? "active" : ""
            }`}
            onClick={() => setActiveCategory(index)}
          >
            <span className="category-icon">{cat.icon}</span>
            {cat.category}
          </button>
        ))}
      </div>

      <div className="prompt-list">
        {promptCategories[activeCategory].prompts.map((prompt, index) => (
          <button
            key={index}
            className="prompt-item"
            onClick={() => {
              onSelectPrompt(prompt);
              onClose();
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;
