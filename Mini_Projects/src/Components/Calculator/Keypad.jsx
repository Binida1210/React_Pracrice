import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";
import FunctionButton from "./FunctionButton";

// Keypad component: dùng grid trực tiếp cho các nút
function Keypad({
  onNumberClick,
  onOperatorClick,
  onDotClick,
  onClear,
  onDelete,
  onEquals,
}) {
  return (
    <div className="calculator-keypad">
      {/* Dòng chức năng */}
      <FunctionButton
        label="AC"
        onClick={onClear}
        className="konosuba-megumin"
      />
      <FunctionButton
        label="DEL"
        onClick={onDelete}
        className="konosuba-megumin"
      />
      <OperatorButton
        operator="÷"
        onClick={onOperatorClick}
        className="konosuba-darkness"
      />
      <OperatorButton
        operator="*"
        onClick={onOperatorClick}
        className="konosuba-darkness"
      />

      {/* Dòng số 7-9 và trừ */}
      <NumberButton
        number={7}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <NumberButton
        number={8}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <NumberButton
        number={9}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <OperatorButton
        operator="-"
        onClick={onOperatorClick}
        className="konosuba-darkness"
      />

      {/* Dòng số 4-6 và cộng */}
      <NumberButton
        number={4}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <NumberButton
        number={5}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <NumberButton
        number={6}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <OperatorButton
        operator="+"
        onClick={onOperatorClick}
        className="konosuba-darkness"
      />

      {/* Dòng số 1-3 và bằng */}
      <NumberButton
        number={1}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <NumberButton
        number={2}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <NumberButton
        number={3}
        onClick={onNumberClick}
        className="konosuba-aqua"
      />
      <OperatorButton
        operator="="
        onClick={onEquals}
        className="konosuba-kazuma"
      />

      {/* Dòng số 0 và dấu chấm */}
      <NumberButton
        number={0}
        onClick={onNumberClick}
        className="konosuba-aqua"
        style={{ gridColumn: "1 / span 2" }}
      />
      <FunctionButton
        label="."
        onClick={onDotClick}
        className="konosuba-kazuma"
      />
    </div>
  );
}

export default Keypad;
