import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cdImage from "../assets/cd.svg";
import "../styles/cover.css";

const Cover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const encodedParams = queryParams.get("params");
      
      if (!encodedParams) {
        throw new Error("No parameters found");
      }

      const decodedParams = JSON.parse(atob(encodedParams));
      setParams(decodedParams);
    } catch (err) {
      console.error("Error parsing parameters:", err);
      setError(err.message);
    }
  }, [location.search]);

  // Handle Play button click
  const handlePlay = () => {
    if (params?.videoId) {
      // Construct the navigation URL with decoded parameters
      const queryString = new URLSearchParams({
        message: params.message,
        title: params.title
      }).toString();

      navigate(`/player/${params.videoId}?${queryString}`);
    } else {
      alert("Invalid link. Please try again.");
    }
  };

  // If there's an error or params are not loaded
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  // If params are not yet loaded
  if (!params) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cover-container">
      <div className="cover-content">
        <div className="cd-container">
          <img 
            src={cdImage} 
            alt="CD Background" 
            className="cover-cd-image" 
          />
          
          {params.coverImage && (
            <div className="cover-image-overlay">
              <img 
                src={params.coverImage} 
                alt="Cover" 
                className="custom-cover-image" 
                onError={(e) => {
                  console.error("Image load error", e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="play-section">
          <h2>{params.title || "Untitled"}</h2>
          <p>Click play to listen to the music and read the message</p>
          
          <button className="play-button" onClick={handlePlay}>
            ▶ Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cover;