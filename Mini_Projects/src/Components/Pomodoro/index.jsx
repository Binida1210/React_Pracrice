import { useState, useEffect, useCallback, useRef } from "react";
import usePomodoro from "./usePomodoro.jsx";
import "./style.css";

export default function Pomodoro() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [isSetting, setIsSetting] = useState(false);
  const [tempMinutes, setTempMinutes] = useState(25);
  const [inputError, setInputError] = useState("");
  const currentSeconds = workMinutes * 60;
  const { seconds, isRunning, start, pause, reset } =
    usePomodoro(currentSeconds);
  const audioRef = useRef();

  // Đồng bộ tempMinutes với workMinutes
  useEffect(() => {
    setTempMinutes(workMinutes);
  }, [workMinutes]);

  // Tính toán progress
  const SVG_SIZE = 170;
  const STROKE_WIDTH = 8.5;
  const RADIUS = (SVG_SIZE - STROKE_WIDTH) / 2; // = 80.75
  const CIRCUM = 2 * Math.PI * RADIUS;
  const progress = currentSeconds > 0 ? seconds / currentSeconds : 0;
  const dashoffset = CIRCUM * (1 - progress);

  // Format thời gian
  const formatTime = useCallback((s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Phát âm thanh khi hết thời gian
  useEffect(() => {
    if (seconds === 0 && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [seconds]);

  // Xử lý setting
  const handleSave = () => {
    if (tempMinutes < 1 || tempMinutes > 60) {
      setInputError("Chỉ nhập từ 1 đến 60 phút");
      return;
    }
    setWorkMinutes(tempMinutes);
    setIsSetting(false);
    setInputError("");
    reset();
  };
  const handleCancel = () => {
    setTempMinutes(workMinutes);
    setIsSetting(false);
    setInputError("");
  };

  return (
    <div className="pomodoro-container">
      <audio ref={audioRef} src="/pomodoro-beep.mp3" preload="auto" />
      <header className="pomodoro-header">
        <h1>Pomodoro Timer</h1>
        <button
          className="settings-btn"
          aria-label="Cài đặt thời gian"
          onClick={() => setIsSetting(true)}
        >
          ⚙️
        </button>
      </header>

      <section className="setting-section">
        <div className="time-setting">
          <span className="setting-label">Thời gian (phút):</span>
          {isSetting ? (
            <div className="setting-input-group">
              <input
                type="number"
                min="1"
                max="60"
                value={tempMinutes}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTempMinutes(val);
                  setInputError(
                    val < 1 || val > 60 ? "Chỉ nhập từ 1 đến 60 phút" : ""
                  );
                }}
                className={`time-input${inputError ? " input-error" : ""}`}
                aria-label="Thời gian phút"
                autoFocus
              />
              <button className="save-btn" onClick={handleSave}>
                Lưu
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          ) : (
            <span className="time-value">{workMinutes}</span>
          )}
        </div>
        {inputError && <div className="input-error-text">{inputError}</div>}
      </section>

      <section className="timer-display">
        <div className="progress-circle-wrapper">
          <svg className="progress-ring" width={SVG_SIZE} height={SVG_SIZE}>
            <circle
              className="progress-ring-bg"
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              r={RADIUS}
              stroke="#e0f7fa"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <circle
              className="progress-ring-bar"
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              r={RADIUS}
              stroke="#38e6c5"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUM}
              strokeDashoffset={dashoffset}
              style={{ transition: "stroke-dashoffset 0.5s linear" }}
            />
          </svg>
          <div className="time-display-centered">
            <span className="time-text-large">{formatTime(seconds)}</span>
          </div>
        </div>
      </section>

      <nav className="timer-controls">
        <button
          className="control-btn toggle-btn"
          onClick={isRunning ? pause : start}
        >
          {isRunning ? (
            <>
              <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>⏸</span>{" "}
              Tạm dừng
            </>
          ) : (
            <>
              <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>▶</span>{" "}
              Bắt đầu
            </>
          )}
        </button>
        <button className="control-btn reset-btn" onClick={reset}>
          Đặt lại
        </button>
      </nav>
    </div>
  );
}
