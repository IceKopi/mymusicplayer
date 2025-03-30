import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cdImage from "../assets/cd.svg";
import "../styles/share.css";

const Share = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const encodedParams = queryParams.get("params");
  let params = null;

  try {
    if (encodedParams) {
      params = JSON.parse(decodeURIComponent(escape(atob(encodedParams))));
    }
  } catch (error) {
    console.error("Decoding error:", error);
  }

  if (!params) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>Invalid or corrupted data.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const { coverImage, videoId, message, title } = params;
  const coverLink = `${window.location.origin}/cover?params=${encodedParams}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLink);
    alert("Link copied to clipboard!");
  };

  const goToCover = () => {
    navigate(`/cover?params=${encodedParams}`);
  };

  return (
    <div className="share-container">
      <div className="share-content">
        <div className="cd-container">
          <img src={cdImage} alt="CD" className="share-cd-image" />
          {coverImage && (
            <div className="cover-image-overlay">
              <img src={coverImage} alt="Cover" className="cover-image" />
            </div>
          )}
        </div>

        <h2>Share Your Song</h2>
        <p>Copy this link and send it to your friends!</p>

        <div className="share-box">
          <input type="text" value={coverLink} readOnly />
          <button className="copy-button" onClick={copyToClipboard}>
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
