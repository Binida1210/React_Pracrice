// Display component for calculator screen
function Display({ expression, result }) {
  return (
    <div className="calculator-display">
      <div className="expression">{expression}</div>
      <div className="result">{result}</div>
    </div>
  );
}

export default Display;
