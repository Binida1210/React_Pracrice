import { useEffect, useState } from "react";
import "./loadmore.css";

export default function LoadMore({ url, pageSize = 12 }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  async function fetchImages(page) {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch(`${url}?page=${page}&limit=${pageSize}`);
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setImages((prev) => [...prev, ...data]);
        if (data.length < pageSize) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  console.log(images);
  const handleLoadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className="loadmore-container">
      <div className="loadmore-grid">
        {images.map((img, idx) => (
          <div className="loadmore-item" key={`${img.id} + ${idx}`}>
            <img
              src={img.download_url}
              alt={img.author || `Image ${idx + 1}`}
              className="loadmore-img"
            />
            <div className="loadmore-caption">
              {img.author ? `By: ${img.author}` : `Image ${idx + 1}`}
            </div>
          </div>
        ))}
      </div>
      {err && <div className="loadmore-error">Error: {err}</div>}
      {loading && <div className="loadmore-loading">Loading...</div>}
      {!loading && hasMore && (
        <button className="loadmore-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      {!hasMore && images.length > 0 && (
        <div className="loadmore-end">No more images.</div>
      )}
    </div>
  );
}
