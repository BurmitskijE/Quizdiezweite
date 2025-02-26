import React from "react";
import "../styles/animations.css"; // Importiert Animationen

const Question = ({ questionText, options, onAnswer }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl mb-4">{questionText}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="quiz-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
