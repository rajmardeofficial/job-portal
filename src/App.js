// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CandidateList from "./components/CandidateList";
import JobList from "./components/JobList";
import ClientList from "./components/ClientList";
import InterviewList from "./components/InterviewList";
import Login from "./components/Login";
import CandidateForm from "./components/CandidateForm";
import JobPostingForm from "./components/AddJob";
import AddClient from "./components/AddClient";
import AdminPage from './components/admin';
import AdminPage2 from './components/admin2';

const App = () => {
  const [dropdownData, setDropdownData] = useState([]);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    // Fetch JWT token (e.g., from local storage or wherever you store it)
    // const storedToken = localStorage.getItem('accessToken');
    const storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5NDAzNzk1LCJpYXQiOjE3MDkzMTczOTUsImp0aSI6ImQ4NzRiMmVlOWJhMzQ2ODY4NzU4ZmIwZjU1NGY5MjVjIiwidXNlcl9pZCI6MX0.AZNdWFAWWa8H-hQxjLoYyD9yDe-6piEo14XpTPxzdb0";
    if (storedToken) {
      setJwtToken(storedToken);
    }
    console.log(storedToken);

    const fetchDataAsync = async () => {
      try {
        const dropDown = await fetch(
          "https://test-jobs.onrender.com/job/api/dropdowns/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setDropdownData(dropDown); 
      } catch (e) {
        console.log(e);

      }
    }; 

    console.log(dropdownData);

    fetchDataAsync();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<AdminPage />} /> {/* Add this route */}
          <Route path="/admin2" element={<AdminPage2 />} /> {/* Add this route */}
          <Route path="/candidatetable" element={<CandidateList />} />
          <Route path="/joblist" element={<JobList />} />
          <Route path="/clientlist" element={<ClientList />} />
          <Route path="/interviewlist" element={<InterviewList />} />

          <Route
            path="/candidateform"
            element={<CandidateForm />}
          />
          <Route
            path="/addjob"
            element={<JobPostingForm />}
          />
           <Route
            path="/addclient"
            element={<AddClient/>}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
