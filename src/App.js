import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextStat from "./components.js/ContetxStat";
import ContextAdmin from "./components.js/ContestAdmin";

import Home from "./screens/Home";
import Sponsor from "./components.js/Sponsor";
import Submit from "./components.js/Submit";
import SpeakTheLanguage from "./screens/SpeakTheLanguage";
import Browse from "./screens/Browse";
import Interactions from "./screens/Interactions";
import Homepage from "./admin/Homepage";
import EditInteraction from "./admin/components/EditInteraction";
import Changelog from "./screens/Changelog";

import './App.css'

function App() {
  return (
      <ContextAdmin>
    <ContextStat>
      <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Browse/:id" element={<Interactions />} />
              <Route exact path="/Browse" element={<Browse />} />
              <Route exact path="/Sponsor" element={<Sponsor />} />
              <Route exact path="/Submit" element={<Submit />} />
              <Route exact path="/SpeakTheLanguage" element={<SpeakTheLanguage />} />
              <Route exact path="/admin" element={<Homepage />} />
              <Route exact path="/EditInteraction/:id" element={<EditInteraction />} />
              <Route exact path="/changelog" element={<Changelog />} />

            </Routes>
          </div>
        </Router>
    </ContextStat>
      </ContextAdmin>
  );
}

export default App;
