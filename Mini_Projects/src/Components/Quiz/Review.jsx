import React from "react";

const Review = ({ quizData, selectedOption, result, onBack }) => {
  return (
    <div className="review-container">
      <h2>Xem lại đáp án</h2>
      {quizData.map((quiz, idx) => (
        <div key={idx} className="review-question">
          <div className="review-q-title">
            Câu {idx + 1}: {quiz.question}
          </div>
          <div className="review-q-options">
            {quiz.options.map((option, oidx) => (
              <span
                key={oidx}
                className={`review-option${
                  option === quiz.answer ? " correct" : ""
                }${
                  option === selectedOption[idx] && option !== quiz.answer
                    ? " wrong"
                    : ""
                }`}
              >
                {option}
              </span>
            ))}
          </div>
          <div className="review-q-result">
            {result[idx] ? "✔ Đúng" : "✗ Sai"}
          </div>
        </div>
      ))}
      <button className="submit-btn" onClick={onBack}>
        Quay lại Quiz
      </button>
    </div>
  );
};

export default Review;
