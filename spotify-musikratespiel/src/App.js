// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game';
import './styles.css';

function App() {
  return (
    <Router>
  <div className="app-container">
    <NavBar />
    <Routes>
    <Route path="/home" element={<Home />} />

    </Routes>
    <Footer />
  </div>
</Router>

  );
}

export default App;
