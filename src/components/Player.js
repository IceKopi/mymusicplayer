import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import vinylImage from "../assets/cd.svg"; 
import cdArm from "../assets/arm.svg"; 
import "../styles/player.css"; 

const Player = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message"); 
  const letterTitle = queryParams.get("title") || "Love Letter";

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareableLink, setShareableLink] = useState("");

  // YouTube player options
  const opts = {
    height: "100%", 
    width: "100%",
    playerVars: { 
      autoplay: 1, // Changed to 1 to autoplay
      controls: 0,
      mute: 0 // Ensure sound is not muted
    },
  };

  // Handle YouTube Player Ready
  const onPlayerReady = (event) => {
    const playerInstance = event.target;
    setPlayer(playerInstance);
    
    // Explicitly play and unmute
    playerInstance.playVideo();
    playerInstance.unMute();
    setIsPlaying(true);
  };

  // Generate shareable link
  useEffect(() => {
    const url = `${window.location.origin}/player/${videoId}?message=${encodeURIComponent(message)}&title=${encodeURIComponent(letterTitle)}`;
    setShareableLink(url);
  }, [videoId, message, letterTitle]);

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="player-container">
      <div className="player-grid">
        {/* Vinyl/Video Container */}
        <div className="vinyl-container">
          <img
            src={vinylImage}
            alt="CD"
            className={`w-full h-full object-contain ${isPlaying ? "spinning" : ""}`}
          />
        </div>

        {/* Tonearm */}
        <img src={cdArm} className="tonearm" alt="Tonearm" />

        {/* Message Box */}
        <div className="message-box">
          <div className="message-box-header">
            <h2>{letterTitle}</h2>
            <div className="message-video">
              <YouTube 
                videoId={videoId} 
                opts={opts} 
                onReady={onPlayerReady} 
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;