import quizData from "./data.js";
import { useState } from "react";
import Question from "./Question";
import Review from "./Review";

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(
    Array(quizData.length).fill(null)
  );
  const [result, setResult] = useState(Array(quizData.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const handleSelectedOption = (option, quizIndex) => {
    setSelectedOption((prev) => {
      const updated = [...prev];
      updated[quizIndex] = option;
      return updated;
    });
  };

  const handleSubmit = (quizIndex) => {
    setResult((prev) => {
      const updated = [...prev];
      updated[quizIndex] =
        selectedOption[quizIndex] === quizData[quizIndex].answer;
      return updated;
    });
  };

  const handleNext = () => {
    if (current < quizData.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const totalCorrect = result.filter((r) => r === true).length;
  const isFinished = result.every((r) => r !== null);

  if (showReview) {
    return (
      <Review
        quizData={quizData}
        selectedOption={selectedOption}
        result={result}
        onBack={() => setShowReview(false)}
      />
    );
  }

  return (
    <div className="quiz-app">
      <h2 className="quiz-title">Quiz Anime Re:Zero</h2>
      <Question
        question={`Câu ${current + 1}: ${quizData[current].question}`}
        options={quizData[current].options}
        selectedOption={selectedOption[current]}
        onSelect={(option) => handleSelectedOption(option, current)}
        onSubmit={() => handleSubmit(current)}
        result={result[current]}
        disabled={result[current] !== null}
      />
      <div className="nav-buttons">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="submit-btn"
          aria-label="Câu trước"
        >
          ← Câu trước
        </button>
        <span style={{ alignSelf: "center", color: "#888" }}>
          Câu {current + 1}/{quizData.length}
        </span>
        <button
          onClick={handleNext}
          disabled={current === quizData.length - 1}
          className="submit-btn"
          aria-label="Câu tiếp"
        >
          Câu tiếp →
        </button>
      </div>
      {isFinished && (
        <div className="quiz-summary">
          <h3>
            Kết quả: {totalCorrect} / {quizData.length} câu đúng
          </h3>
          <button
            className="submit-btn"
            onClick={() => setShowReview(true)}
            style={{ marginTop: 12 }}
          >
            Xem lại toàn bộ đáp án
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
