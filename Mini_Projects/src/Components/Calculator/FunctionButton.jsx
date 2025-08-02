// FunctionButton component for special functions like AC, DEL
function FunctionButton({ label, onClick, className = "function" }) {
  return (
    <button className={`calculator-key ${className}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default FunctionButton;
