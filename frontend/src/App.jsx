import React from 'react';
import Homepage from './components/Home/HomePage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePlan from './components/Course/CoursePlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/course-plan" element={<CoursePlan />} />
      </Routes>
    </Router>
  );
}

export default App;