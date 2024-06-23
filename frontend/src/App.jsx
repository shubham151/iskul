import React, { useState, useEffect } from 'react';
import Homepage from './components/Home/HomePage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePlan from './components/Course/CoursePlan';
import Loader from './components/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay or async operation
    setTimeout(() => {
      setLoading(false); // Set loading to false after data is fetched or operation is completed
    }, 2000); // Example delay of 2 seconds
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader text="Loading..." />
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/course-plan" element={<CoursePlan />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
