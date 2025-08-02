// OperatorButton component for operation inputs
function OperatorButton({ operator, onClick, className = "operator" }) {
  return (
    <button
      className={`calculator-key ${className}`}
      onClick={() => onClick(operator)}
    >
      {operator}
    </button>
  );
}

export default OperatorButton;
