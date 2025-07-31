import { useEffect, useState } from "react";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import "./style.css";

export default function ImageSlider({ url, page = 1, limit = 10 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(url) {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch(`${url}?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      setErr(err.message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url) {
      fetchImages(url);
    }
    // eslint-disable-next-line
  }, [url, page, limit]);

  // Reset currentSlide về 0 khi images thay đổi
  useEffect(() => {
    setCurrentSlide(0);
  }, [images]);

  // Preload ảnh trước và sau
  useEffect(() => {
    if (images.length > 0) {
      const preload = (idx) => {
        if (images[idx]) {
          const img = new window.Image();
          img.src = images[idx].download_url;
        }
      };
      preload((currentSlide + 1) % images.length);
      preload((currentSlide - 1 + images.length) % images.length);
    }
  }, [currentSlide, images]);

  if (loading) {
    return <div className="slider-loading">Loading data ... </div>;
  }

  console.log(images);

  if (err !== null) {
    return <div className="slider-error">Error occured: {err}</div>;
  }

  return (
    <div className="slider-container">
      {images.length > 0 ? (
        <div className="slider-content">
          <button
            className="slider-btn prev"
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            aria-label="Previous"
          >
            <GrCaretPrevious />
          </button>
          <div className="slider-img-wrapper">
            <img
              src={images[currentSlide].download_url}
              alt={images[currentSlide].author || `Slide ${currentSlide + 1}`}
              className="slider-img"
            />
            <div className="slider-caption">
              {images[currentSlide].author
                ? `By: ${images[currentSlide].author}`
                : `Slide ${currentSlide + 1}`}
            </div>
            {/* Navigation dots */}
            <div className="slider-dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={
                    "slider-dot" + (idx === currentSlide ? " active" : "")
                  }
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setCurrentSlide(idx);
                  }}
                />
              ))}
            </div>
          </div>
          <button
            className="slider-btn next"
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            aria-label="Next"
          >
            <GrCaretNext />
          </button>
        </div>
      ) : (
        <div className="slider-empty">No images found.</div>
      )}
    </div>
  );
}
