import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Player from "./components/Player";
import Share from "./components/Share";
import Cover from "./components/Cover";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:videoId" element={<Player />} />
        <Route path="/share" element={<Share />} />
        <Route path="/cover" element={<Cover />} />
      </Routes>
    </Router>
  );
}

export default App;
