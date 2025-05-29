import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import DesignEditor from "./pages/DesignEditor";
import "./App.css";

function App() {
  // Karanlık mod kontrolü
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Router>
        <nav style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
          <Link to="/" style={{ marginRight: 10 }}>Ana Sayfa</Link>
          <Link to="/about" style={{ marginRight: 10 }}>Hakkında</Link>
          <Link to="/editor" style={{ marginRight: 10 }}>Tasarım Editörü</Link>
          <button onClick={() => setDarkMode(dm => !dm)}>
            {darkMode ? "Açık Mod" : "Karanlık Mod"}
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/editor" element={<DesignEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
