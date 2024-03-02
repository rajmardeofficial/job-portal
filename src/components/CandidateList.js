import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function CandidateList() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://test-jobs.onrender.com/candidate/api/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRowData(data);

          // Generate column definitions dynamically based on fetched data
          const generatedColumnDefs = Object.keys(data[0]).map((key) => {
            if (key === "resume") {
              // For 'resume' field, include a custom cell renderer
              return {
                headerName: key.toUpperCase(),
                field: key,
                resizable: true,
                filter: true,
                floatingFilter: true,
                sortable: true,
                suppressMenu: false,
                filterParams: {
                  debounceMs: 300
                },
                cellRenderer: (params) => {
                  return params.value ? (
                    <a href={params.value} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : null;
                },
              };
            } else {
              return {
                headerName: key.toUpperCase(),
                field: key,
                resizable: true,
                filter: true,
                floatingFilter: true,
                sortable: true,
                suppressMenu: false,
                filterParams: {
                  debounceMs: 300
                },
              };
            }
          });

          // Exclude specific columns (e.g., 'id') from being displayed
          const excludedColumns = ['created_by', 'updated_by', 'updated_by_info'];
          const filteredColumnDefs = generatedColumnDefs.filter(
            (columnDef) => !excludedColumns.includes(columnDef.field)
          );

          setColumnDefs(filteredColumnDefs);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // call fetchData function
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "calc(100vh - 50px)", width: "100%" }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          enableFilter={true}
          enableAdvancedFilter={true}
        />
      </div>
    </div>
  );
}

export default CandidateList;
