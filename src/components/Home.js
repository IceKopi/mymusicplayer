import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cdImage from "../assets/cd.svg";
import "../styles/home.css";

const Home = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [message, setMessage] = useState("");
  const [letterTitle, setLetterTitle] = useState("Love Letter");
  const [coverImage, setCoverImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const maxSize = 5 * 1024 * 1024;

      if (!validImageTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF, WebP)");
        return;
      }

      if (file.size > maxSize) {
        alert("Image size should be less than 5MB");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    if (coverImage) {
      URL.revokeObjectURL(coverImage);
    }
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePlay = () => {
    const videoId = getYouTubeId(inputUrl);
    if (videoId) {
      const params = {
        videoId,
        message,
        title: letterTitle,
        coverImage: coverImage || null,
      };

      const encodedParams = btoa(unescape(encodeURIComponent(JSON.stringify(params))));

      navigate(`/share?params=${encodedParams}`);
    } else {
      alert("Invalid YouTube link!");
    }
  };

  React.useEffect(() => {
    return () => {
      if (coverImage) {
        URL.revokeObjectURL(coverImage);
      }
    };
  }, [coverImage]);

  return (
    <div className="container">
      <div className="grid">
        <div className="left">
          <div className="cd-container">
            <img src={cdImage} alt="CD" className="cd-image" />
            {coverImage && (
              <div className="cover-image-overlay">
                <img src={coverImage} alt="Cover" className="cover-image" />
                <button className="remove-cover-btn" onClick={handleRemoveImage}>
                  ×
                </button>
              </div>
            )}
          </div>
          <div className="image-upload-container">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              className="file-input"
            />
            <button className="upload-button" onClick={() => fileInputRef.current.click()}>
              Upload Cover Image
            </button>
          </div>
        </div>
        <div className="right">
          <div className="input-box">
            <p>Add Music Link</p>
            <input
              type="text"
              placeholder="Enter YouTube Music Link..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>
          <div className="input-box">
            <p>Letter Title</p>
            <input
              type="text"
              placeholder="Enter letter title..."
              value={letterTitle}
              onChange={(e) => setLetterTitle(e.target.value)}
              maxLength={30}
            />
          </div>
          <div className="input-box">
            <p>Add Message</p>
            <textarea
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button className="play-button" onClick={handlePlay}>
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
