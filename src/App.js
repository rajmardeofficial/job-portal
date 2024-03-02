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

const App = () => {
  const [dropdownData, setDropdownData] = useState([]);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setJwtToken(storedToken);
    }

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
