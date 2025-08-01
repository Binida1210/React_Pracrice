// NumberButton component for digit inputs
function NumberButton({ number, onClick, className = "" }) {
  return (
    <button
      className={`calculator-key ${className}`}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
}

export default NumberButton;
