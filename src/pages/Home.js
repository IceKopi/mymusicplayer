import React, { useState } from "react";
import MusicUpload from "../components/MusicUpload";
import Player from "../components/Player";

const Home = () => {
  const [music, setMusic] = useState(null);
  const [cover, setCover] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = (musicFile, coverFile, msg) => {
    setMusic(musicFile);
    setCover(coverFile);
    setMessage(msg);
  };

  return (
    <div>
      <MusicUpload onUpload={handleUpload} />
      <Player music={music} cover={cover} message={message} />
    </div>
  );
};

export default Home;
