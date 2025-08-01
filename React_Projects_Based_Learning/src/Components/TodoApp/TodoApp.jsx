import { useContext, useReducer, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { FiEdit3, FiTrash2, FiCheck, FiX, FiSun, FiMoon } from "react-icons/fi";
import "./todoapp.css";

function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          done: false,
        },
      ];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.id);
    case "edit":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    case "load":
      return action.todos;
    default:
      return state;
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { theme, setTheme } = useContext(ThemeContext);

  // Local Storage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch({ type: "load", todos: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Apply theme to body
  useEffect(() => {
    const body = document.body;
    body.className = theme; // Apply theme class to body

    // Set CSS variables for body background
    if (theme === "light") {
      body.style.background =
        "linear-gradient(135deg, #e0f2fe 0%, #f3f4f6 100%)";
    } else {
      body.style.background =
        "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
    }
    body.style.minHeight = "100vh";
    body.style.transition = "background 0.3s ease";
  }, [theme]);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: "add", text: input.trim() });
      setInput("");
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: "remove", id });
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch({ type: "edit", id: editingId, text: editText.trim() });
    }
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className={`todoapp-container ${theme}`}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.2rem",
          letterSpacing: 1,
        }}
      >
        Todo List
      </h2>
      <button
        className="theme-btn"
        aria-label="Switch theme"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <FiMoon /> : <FiSun />}
        <span style={{ marginLeft: "0.5rem" }}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </span>
      </button>
      <div className="todoapp-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          aria-label="Add a new task"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          maxLength={60}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          aria-label="Add task"
        >
          Add
        </button>
      </div>

      <ul className="todoapp-list">
        {todos.length === 0 ? (
          <li className="empty-state">No tasks yet. Enjoy your day! 🎉</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.done ? "done" : ""}`}
            >
              <div className="todo-content">
                {editingId === todo.id ? (
                  <div className="edit-form">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit();
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      autoFocus
                      className="edit-input"
                    />
                    <button onClick={handleSaveEdit} className="save-btn">
                      <FiCheck />
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-btn">
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <span
                    onClick={() => dispatch({ type: "toggle", id: todo.id })}
                    onDoubleClick={() => handleEdit(todo.id, todo.text)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={todo.done}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      dispatch({ type: "toggle", id: todo.id })
                    }
                    title={todo.done ? "Mark as not done" : "Mark as done"}
                    className="todo-text"
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              {editingId !== todo.id && (
                <div className="todo-actions">
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    aria-label={`Edit ${todo.text}`}
                    className="edit-btn"
                    title="Edit task"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => handleRemove(todo.id)}
                    aria-label={`Remove ${todo.text}`}
                    className="remove-btn"
                    title="Remove task"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
