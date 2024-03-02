import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Tooltip } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const AdminPage = () => {
  const [chartData, setChartData] = useState({});
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(true);
    // Fetch data from the API
    axios.get('http://127.0.0.1:8000/interview/api/summary/')
      .then(response => {
        // Extracting data from the response
        const data = response.data.message;
        const res = data
        setInfo(res);

        // Process data for the pie chart
        const labels = data.map(item => item.status);
        const counts = data.map(item => item.status_count);
        
        // Generating random colors for the chart
        const colors = Array.from({ length: labels.length }, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: counts,
              backgroundColor: colors,
            },
          ],
        });
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false)
      });
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <h1>Admin Page</h1>
      {isLoading ? <p>Loading admin data...{console.log('=======')}</p> :
      <>
      <div>
      {info.map((item, index) => (
          <div key={index}>
            <p>Status: {item.status}</p>
            <p>Status Count: {item.status_count}</p>
          </div>
        ))}
      </div>
      {/* <div style={{ width: '300px', height: '300px' }}>
        <Pie data={chartData} />
      </div> */}
      <div style={{ position: 'relative', width: '300px', height: '300px' }}> {/* Adjust width and height to make the chart smaller */}
            <Pie data={chartData} options={{
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          if (label) {
            const value = context.raw;
            return `${label}: ${value}`;
          }
          return '';
        }
      }
    }
  }
}}
 />
          </div>
      </>}
    </div>
  );
};

export default AdminPage;
