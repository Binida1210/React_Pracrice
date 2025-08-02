import { useState } from "react";
import "./style.css";

export default function FileUploadDrop() {
  const [fileName, setFileName] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [error, setError] = useState(null);

  // FUNCTION KIỂM TRA FILE CÓ PHẢI ẢNH KHÔNG
  const isValidImageFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    return validTypes.includes(file.type);
  };

  // FUNCTION ĐỌC FILE BẰNG FILE READER API
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result); // Base64 string của ảnh
      };

      reader.onerror = () => {
        reject(new Error("Không thể đọc file"));
      };

      reader.readAsDataURL(file); // Đọc file thành data URL
    });
  };

  // 🎯 FUNCTION XỬ LÝ FILE ĐƯỢC CHỌN
  const processFile = async (file) => {
    setError(null);

    // Kiểm tra loại file
    if (!isValidImageFile(file)) {
      setError("❌ Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WebP)");
      return;
    }

    // Kiểm tra kích thước file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("❌ File quá lớn! Tối đa 5MB");
      return;
    }

    try {
      // Đọc file thành base64 để preview
      const dataURL = await readFileAsDataURL(file);
      console.log(dataURL);
      // Cập nhật state
      setFileName(file.name);
      setFileSize(file.size);
      setImagePreview(dataURL);
      console.log("✅ File processed successfully:", file);
    } catch (err) {
      setError("❌ Lỗi khi đọc file: " + err.message);
    }
  };

  // Xử lý khi thả file
  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]); // Sử dụng function mới
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  // Xử lý khi chọn file qua input
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file); // Sử dụng function mới
    }
  };

  // Reset function
  const resetUpload = () => {
    setFileName(null);
    setImagePreview(null);
    setFileSize(null);
    setError(null);
  };

  return (
    <div className="main-container">
      <div className="layout-container">
        {/* BẾN TRÁI - PHẦN UPLOAD */}
        <div className="upload-section">
          <h2>📂 Upload Image</h2>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Drop zone */}
          <div
            className={`drop-zone ${highlight ? "highlight" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {fileName ? (
              <div className="file-info">
                <p>File name: {fileName}</p>
                <p>File size: {(fileSize / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <p> ⬆️ Kéo ảnh vào đây hoặc click chọn</p>
            )}
          </div>

          {/* Input chọn file */}
          <label className="file-button">
            📁 Chọn ảnh từ máy
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              hidden
            />
          </label>

          {/* Reset button */}
          {fileName && (
            <button className="reset-btn" onClick={resetUpload}>
              🔄 Upload lại
            </button>
          )}
        </div>

        {/* BẾN PHẢI - PHẦN PROFILE PREVIEW */}
        <div className="profile-section">
          <h2>Tran Xuan Binh</h2>

          <div className="profile-card">
            <div className="avatar-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Avatar"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <p>No avatar</p>
                </div>
              )}
            </div>

            <div className="profile-info">
              <p className="title">Fullstack Developer</p>
              <p className="email">binida2k1@gmail.com</p>

              <div className="stats">
                <div className="stat">
                  <span className="number">1.2k</span>
                  <span className="label">Likes</span>
                </div>
                <div className="stat">
                  <span className="number">28</span>
                  <span className="label">Followers</span>
                </div>
                <div className="stat">
                  <span className="number">110</span>
                  <span className="label">Following</span>
                </div>
              </div>

              <button className="profile-btn">
                {imagePreview ? "✅ Avatar Updated" : "⬆️ Upload Avatar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
