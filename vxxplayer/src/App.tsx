import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import MasterPlayer from "./MasterPlayer";
import VideoPlayer from "./components/VideoPlayer";
import Layout from "./Layout";
import TagView from "@components/TagView";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tags/:folder" element={<TagView />} />
          <Route path="/player/:folder/:id" element={<VideoPlayer />} />
          <Route path="/masterplayer" element={<MasterPlayer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
