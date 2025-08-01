import { useState, useEffect, useCallback } from "react";
import "./style.css";

export default function RandomBGInterval() {
  const [color, setColor] = useState("#ffffff");
  const [isRunning, setIsRunning] = useState(false);

  // Generate random hex color with proper padding
  const generateRandomColor = useCallback(() => {
    const randomColor = Math.floor(Math.random() * 16777215);
    return "#" + randomColor.toString(16).padStart(6, "0");
  }, []);

  // Toggle interval state
  const handleToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // Reset to default
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setColor("#ffffff");
    document.body.style.backgroundColor = "#ffffff";
  }, []);

  // Copy color to clipboard
  const copyToClipboard = useCallback(async (colorValue) => {
    try {
      await navigator.clipboard.writeText(colorValue);
      alert(`Color ${colorValue} copied to clipboard!`);
    } catch (err) {
      console.error("Failed to copy color: ", err);
    }
  }, []);

  // Color changing interval effect
  useEffect(() => {
    let intervalID;

    if (isRunning) {
      intervalID = setInterval(() => {
        const newColor = generateRandomColor();
        setColor(newColor);
      }, 1000);
    }

    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [isRunning, generateRandomColor]);

  // Apply background color effect
  useEffect(() => {
    document.body.style.backgroundColor = color;

    // Cleanup on unmount
    return () => {
      document.body.style.backgroundColor = "#ffffff";
    };
  }, [color]);

  return (
    <div className="random-bg-container">
      <div className="content-wrapper">
        <h1 className="title">Random Background Color</h1>

        <div className="color-display">
          <div
            className="color-preview"
            style={{ backgroundColor: color }}
          ></div>
          <div className="color-info">
            <h2 className="current-color">{color.toUpperCase()}</h2>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(color)}
              title="Copy color to clipboard"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="controls">
          <button
            className={`toggle-btn ${isRunning ? "stop" : "start"}`}
            onClick={handleToggle}
          >
            {isRunning ? "Stop" : "Start"} Color Changing
          </button>

          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="info">
          <p>
            Status:{" "}
            <span className={isRunning ? "running" : "stopped"}>
              {isRunning ? "Running" : "Stopped"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
