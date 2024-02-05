// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Table from './components/Table';
import FormComponent from './components/FormComponent';
import Login from './components/Login';
import fetchData from './Services/fetchData';

const App = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [interviewList, setInterviewList] = useState([]);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    // Fetch JWT token (e.g., from local storage or wherever you store it)
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setJwtToken(storedToken);
    }

    // Fetch data from your APIs using the JWT token
    const fetchDataAsync = async () => {
      try {
        if (jwtToken) {
          // Fetch data from the first API
          const data1 = await fetchData("https://test-jobs.onrender.com/candidate/api/", jwtToken);
          setFetchedData(data1);

          // Fetch data from the second API (dropdowns)
          const data2 = await fetchData("https://test-jobs.onrender.com/job/api/dropdowns/", jwtToken);
          setDropdownData(data2);

          const data3 = await fetchData("https://test-jobs.onrender.com/job/api/", jwtToken)
          setJobList(data3)
          
          const data4 = await fetchData("https://test-jobs.onrender.com/client/api/", jwtToken)
          setClientList(data4)

          const data5 = await fetchData("https://test-jobs.onrender.com/interview/api/", jwtToken)
          setInterviewList(data5)

        
          setLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        // Handle authentication error or other issues
        console.error("Error fetching data:", error);

        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchDataAsync();
  }, [jwtToken]);

 

  return (
    <Router>
      <div>
        <Navbar />
        {loading ? (
          // Render a loading indicator here
          <div>Loading...</div>
        ) : (
          // Render routes and components when data is loaded
          <Routes>
            
            <Route path="/candidatetable" element={<Table fetchedData={fetchedData} />} />
            <Route path="/joblist" element={<Table fetchedData={jobList} />} />
            <Route path="/clientlist" element={<Table fetchedData={clientList} />} />
            <Route path="/interviewlist" element={<Table fetchedData={interviewList} />} />
            <Route path="/form" element={<FormComponent dropdownData={dropdownData} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
