const Question = ({
  question,
  options,
  selectedOption,
  onSelect,
  onSubmit,
  result,
  disabled,
}) => {
  return (
    <div className="question-container modern-question">
      <div className="question-title modern-question-title">{question}</div>
      <div className="options-group modern-options-group">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`option-btn modern-option-btn${
              selectedOption === option ? " selected" : ""
            }`}
            onClick={() => onSelect(option)}
            disabled={disabled}
            tabIndex={0}
            aria-pressed={selectedOption === option}
          >
            <span className="option-label">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
      <button
        className="submit-btn modern-submit-btn"
        onClick={onSubmit}
        disabled={selectedOption === null || disabled}
      >
        Xác nhận
      </button>
      {result !== null && (
        <div
          className={`result-msg modern-result-msg ${
            result ? "correct" : "incorrect"
          }`}
        >
          {result ? "Chính xác!" : "Sai rồi!"}
        </div>
      )}
    </div>
  );
};

export default Question;
