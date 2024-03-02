import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

// Define mapping for human-readable status names
const statusMap = {
  selected: "Selected",
  rejected: "Rejected",
  in_process: "In Process",
  hold: "Hold",
};

function AdminPage2() {
  const [chartData, setChartData] = useState([]);
  const [execchartData, setExecChartData] = useState([]);
  const [chartColors, setChartColors] = useState([]);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/interview/api/summary/";

    axios
      .get(apiUrl)
      .then((response) => {
        // const dataFromApi = response.data.message;
        const dataFromApi = [
                {
                    "status": "in_process",
                    "status_count": 6
                },
                {
                    "status": "selected",
                    "status_count": 18
                },
                {
                    "status": "rejected",
                    "status_count": 9
                },
                {
                    "status": "hold",
                    "status_count": 4
                }
            ]

        // Prepare data with human-readable status names
        const chartDataFromApi = [
          ["Status", "Count"],
          ...dataFromApi.map((item) => [
            statusMap[item.status],
            item.status_count,
          ]),
        ];

        // Set colors for each status
        const colors = dataFromApi.map((item) => {
          switch (item.status) {
            case "rejected":
              return "red";
            case "in_process":
              return "#FFC107";
            case "selected":
              return "green";
            case "hold":
              return "#FFA07A";
            default:
              return "gray";
          }
        });

        setChartData(chartDataFromApi);
        setChartColors(colors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/interview/api/exec_summary/";

    axios
      .get(apiUrl)
      .then((response) => {
        // const dataFromApi = response.data;
        const dataFromApi = {
            "exec2": {
                "job_count": 1,
                "interview_count": 2
            },
         "exec1": {
                "job_count": 0,
                "interview_count": 0
            },
            "exec3": {
                "job_count": 13,
                "interview_count": 3
            },
         "exec4": {
                "job_count": 10,
                "interview_count": 5
            },
            "exec5": {
                "job_count": 14,
                "interview_count": 10
            },
         "exec6": {
                "job_count": 6,
                "interview_count": 8
            }
        }
        // Prepare data for the bar chart
        const chartDataFromApi = [
          ["Executive", "Job Count", "Interview Count"],
          ...Object.entries(dataFromApi).map(([executive, data]) => [
            executive,
            data.job_count,
            data.interview_count,
          ]),
        ];

        setExecChartData(chartDataFromApi);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Interviews</h2>
      <Chart 
        chartType="PieChart"
        data={chartData}
        options={{
          pieSliceText: "value",
          slices: chartData.slice(1).map((_, index) => ({
            color: chartColors[index],
          })),
        }}
        width={"100%"}
        height={"400px"}
      />
      <h2>Job and Interview Counts by Executive</h2>
      <Chart
        chartType="Bar"
        data={execchartData}
        options={{
          title: "Job and Interview Counts by Executive",
          legend: { position: "top" },
          bars: "vertical",
          bar: { groupWidth: "20%" },
        }}
        width={"100%"}
        height={"500px"}
      />
    </div>
  );
}

export default AdminPage2;