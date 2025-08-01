import { useReducer } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import "./style.css";

// Initial state
const initialState = {
  display: "0",
  expression: "",
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

// Action types
const ACTIONS = {
  INPUT_NUMBER: "INPUT_NUMBER",
  INPUT_DOT: "INPUT_DOT",
  CLEAR: "CLEAR",
  DELETE: "DELETE",
  PERFORM_OPERATION: "PERFORM_OPERATION",
  CALCULATE: "CALCULATE",
};

// Calculator helper function
const calculate = (firstValue, secondValue, operation) => {
  switch (operation) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "*":
      return firstValue * secondValue;
    case "÷":
      return firstValue / secondValue;
    default:
      return secondValue;
  }
};

// Reducer function
const calculatorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT_NUMBER:
      if (state.waitingForOperand) {
        return {
          ...state,
          display: String(action.payload),
          waitingForOperand: false,
        };
      }
      return {
        ...state,
        display:
          state.display === "0"
            ? String(action.payload)
            : state.display + action.payload,
      };

    case ACTIONS.INPUT_DOT:
      if (state.display.indexOf(".") === -1) {
        return {
          ...state,
          display: state.display + ".",
        };
      }
      return state;

    case ACTIONS.CLEAR:
      return {
        ...initialState,
      };

    case ACTIONS.DELETE:
      if (state.display.length > 1) {
        return {
          ...state,
          display: state.display.slice(0, -1),
        };
      }
      return {
        ...state,
        display: "0",
      };

    case ACTIONS.PERFORM_OPERATION: {
      const inputValue = parseFloat(state.display);

      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: inputValue,
          operation: action.payload,
          waitingForOperand: true,
          expression: `${inputValue} ${action.payload} `,
        };
      }

      if (state.operation) {
        const currentValue = state.previousValue || 0;
        const newValue = calculate(currentValue, inputValue, state.operation);

        return {
          ...state,
          display: String(newValue),
          previousValue: newValue,
          operation: action.payload,
          waitingForOperand: true,
          expression: `${newValue} ${action.payload} `,
        };
      }

      return {
        ...state,
        operation: action.payload,
        waitingForOperand: true,
        expression: `${state.display} ${action.payload} `,
      };
    }

    case ACTIONS.CALCULATE: {
      const input = parseFloat(state.display);

      if (state.previousValue !== null && state.operation) {
        const newValue = calculate(state.previousValue, input, state.operation);

        return {
          ...state,
          display: String(newValue),
          previousValue: null,
          operation: null,
          waitingForOperand: true,
          expression: `${state.expression}${input} = ${newValue}`,
        };
      }

      return state;
    }

    default:
      return state;
  }
};

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Handler functions for component props
  const handleNumberClick = (number) => {
    dispatch({ type: ACTIONS.INPUT_NUMBER, payload: number });
  };

  const handleOperatorClick = (operator) => {
    dispatch({ type: ACTIONS.PERFORM_OPERATION, payload: operator });
  };

  const handleDotClick = () => {
    dispatch({ type: ACTIONS.INPUT_DOT });
  };

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE });
  };

  const handleEquals = () => {
    dispatch({ type: ACTIONS.CALCULATE });
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display expression={state.expression} result={state.display} />
        <Keypad
          onNumberClick={handleNumberClick}
          onOperatorClick={handleOperatorClick}
          onDotClick={handleDotClick}
          onClear={handleClear}
          onDelete={handleDelete}
          onEquals={handleEquals}
        />
      </div>
    </div>
  );
}

export default Calculator;
