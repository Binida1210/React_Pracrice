import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import "./style.css";

export default function Rating({ starNum = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    setRating(index);
  };

  const handleMouseMove = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  const resetRating = () => {
    setRating(0);
    setHover(0);
  };

  return (
    <div className="rating-container">
      <div className="rating-header">
        <h1 className="rating-title">⭐ Star Rating</h1>
        <p className="rating-subtitle">Click on stars to rate!</p>
      </div>

      <div className="rating-stars">
        {[...Array(starNum)].map((_, index) => {
          index += 1;
          return (
            <div key={index} className="star-wrapper">
              {index <= (hover || rating) ? (
                <GoStarFill
                  className="star star-filled"
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => handleMouseMove(index)}
                  onMouseLeave={handleMouseLeave}
                />
              ) : (
                <GoStar
                  className="star star-empty"
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => handleMouseMove(index)}
                  onMouseLeave={handleMouseLeave}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="rating-info">
        <div className="rating-display">
          <span className="rating-text">
            {rating > 0 ? `${rating} out of ${starNum} stars` : "No rating yet"}
          </span>
          <div className="rating-bar">
            <div
              className="rating-fill"
              style={{ width: `${(rating / starNum) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          className="reset-button"
          onClick={resetRating}
          disabled={rating === 0}
        >
          🔄 Reset Rating
        </button>
      </div>

      {rating !== 0 && (
        <div className="rating-feedback">
          {Math.floor((rating / starNum) * 100) >= 0 &&
            Math.floor((rating / starNum) * 100) <= 20 && (
              <span className="feedback poor">😞 Poor</span>
            )}
          {Math.floor((rating / starNum) * 100) > 20 &&
            Math.floor((rating / starNum) * 100) <= 40 && (
              <span className="feedback fair">😐 Fair</span>
            )}
          {Math.floor((rating / starNum) * 100) > 40 &&
            Math.floor((rating / starNum) * 100) <= 60 && (
              <span className="feedback good">🙂 Good</span>
            )}
          {Math.floor((rating / starNum) * 100) > 60 &&
            Math.floor((rating / starNum) * 100) <= 80 && (
              <span className="feedback very-good">😊 Very Good</span>
            )}
          {Math.floor((rating / starNum) * 100) > 80 && (
            <span className="feedback excellent">🤩 Excellent!</span>
          )}
        </div>
      )}
    </div>
  );
}
