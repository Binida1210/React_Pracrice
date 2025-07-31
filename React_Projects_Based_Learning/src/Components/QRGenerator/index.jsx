import { useState } from "react";
import QRCode from "react-qr-code";
import "./style.css";

function QRGenerator() {
  const [qr, setQR] = useState("");
  const [input, setInput] = useState("");

  const handleGenerate = () => {
    setQR(input);
  };

  return (
    <div className="qrgen-container">
      <h1 className="qrgen-title">QR Code Generator</h1>
      <div className="qrgen-form">
        <input
          type="text"
          name="qr-code"
          className="qrgen-input"
          placeholder="Enter your value here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              handleGenerate();
            }
          }}
        />
        <button
          className="qrgen-btn"
          onClick={handleGenerate}
          disabled={!input.trim()}
        >
          Generate
        </button>
      </div>
      <div className="qrgen-qr-wrapper">
        {qr && (
          <QRCode
            id="qr-code-value"
            value={qr}
            size={260}
            bgColor="#fff"
            fgColor="#222"
          />
        )}
      </div>
    </div>
  );
}

export default QRGenerator;
