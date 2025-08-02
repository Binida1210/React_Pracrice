import { useState, useCallback } from "react";
import "./style.css";

function RandomColor() {
  const [color, setColor] = useState("#121001");
  const [type, setType] = useState("hex");
  const [showToast, setShowToast] = useState(false);

  const randomColorUtility = useCallback(
    (length) => Math.floor(Math.random() * length),
    []
  );

  const generateHexColor = useCallback(() => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
    setType("hex");
  }, [randomColorUtility]);

  const generateRGBColor = useCallback(() => {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);

    setColor(`rgb(${r}, ${g}, ${b})`);
    setType("rgb");
  }, [randomColorUtility]);

  const generateRandomColor = useCallback(() => {
    Math.random() >= 0.5 ? generateHexColor() : generateRGBColor();
  }, [generateHexColor, generateRGBColor]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className="color-generator-container"
      style={{ backgroundColor: color }}
    >
      <div className="content-wrapper">
        <h1 className="title">🎨 Random Color Generator</h1>

        <div className="color-display">
          <div className="color-info">
            <span className="color-type">{type.toUpperCase()}</span>
            <span
              className="color-value"
              onClick={copyToClipboard}
              title="Click to copy"
            >
              {color}
            </span>
          </div>
        </div>

        <div className="button-group">
          <button className="color-btn hex-btn" onClick={generateHexColor}>
            Generate HEX
          </button>
          <button className="color-btn rgb-btn" onClick={generateRGBColor}>
            Generate RGB
          </button>
          <button
            className="color-btn random-btn"
            onClick={generateRandomColor}
          >
            🎲 Random
          </button>
        </div>

        <div className="features">
          <p className="copy-hint">💡 Click on the color value to copy it!</p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          <span className="toast-icon">✅</span>
          <span className="toast-message">Color copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}

export default RandomColor;
