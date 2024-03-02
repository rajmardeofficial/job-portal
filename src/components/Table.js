import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Table.css";

const Table = ({ fetchedData, filterColumns }) => {
  const [data, setData] = useState(fetchedData || []);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setData(fetchedData || []);
  }, [fetchedData]);

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA == null || valueB == null) {
        // Handle null or undefined values
        return 0;
      }

      if (typeof valueA === "string") {
        return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return isAsc ? valueA - valueB : valueB - valueA;
      }
    });

    setData(sortedData);
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const applyFilters = () => {
    let filtered = [...data];

    Object.keys(filters).forEach((column) => {
      if (filters[column]) {
        filtered = filtered.filter((row) => row[column] === filters[column]);
      }
    });

    return filtered;
  };

  const filteredData = applyFilters().filter((row) => {
    const searchableValues = Object.values(row).join(" ").toLowerCase();
    return searchableValues.includes(searchTerm.toLowerCase());
  });

  const getFriendlyColumnName = (columnName) => {
    // Capitalize the first letter and replace underscores with spaces
    let friendlyName = columnName.replace(/_/g, " ");

    // Capitalize the first letter of each word
    friendlyName = friendlyName.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );

    // Handle acronyms (e.g., "URL" should become "Url" instead of "URL")
    friendlyName = friendlyName
      .replace(/\bUrl\b/g, "URL")
      .replace(/\b([A-Z])\b/g, "$1");

    return friendlyName;
  };

  const excludedColumns = ["created_by", "updated_by_info", "updated_by"];
  const excludedFilters = [...excludedColumns, ...filterColumns];

  const columnConfig = Object.keys(data[0] || {}).reduce((acc, key) => {
    if (!excludedColumns.includes(key)) {
      acc[key] = getFriendlyColumnName(key);
    }
    return acc;
  }, {});

  return (
    <div>
      <div
        className="container mt-3"
        style={{ zIndex: 0, position: "relative" }}
      >
        <div className="input-group me-4" style={{ width: "350px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        {Object.keys(columnConfig).map((column, index) => (
          <div key={index} className="mb-3">
            <label style={{ display: excludedFilters.includes(column) ? 'none' : 'block' }} className="form-label">{getFriendlyColumnName(column)}</label>
            <select
              className="form-select"
              value={filters[column] || ""}
              onChange={(e) => handleFilterChange(column, e.target.value)}
              style={{ display: excludedFilters.includes(column) ? 'none' : 'block' }}
            >
              <option value="">All</option>
              {[...new Set(data.map((row) => row[column]))].map((value, idx) => (
                <option key={idx} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <hr />
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {Object.keys(columnConfig).map((column, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(column)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="table-header">
                    {columnConfig[column].length > 15 ? (
                      <span title={columnConfig[column]}>
                        {columnConfig[column].substring(0, 15)}...
                      </span>
                    ) : (
                      <span>{columnConfig[column]}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(columnConfig).map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column === "resume" ? (
                      <a
                        href={row[column]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resume Link
                      </a>
                    ) : typeof row[column] === "object" ? (
                      JSON.stringify(row[column])
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

//   [
//     {
//       id: 7,
//       name: "Alice Smith",
//       mobile_no: "9090908989",
//       email: "john.smith@example.com",
//       current_location_city: "Chicago",
//       current_sub_location: null,
//       permanent_location_city: "Denver",
//       permanent_sub_location: null,
//       higher_education: "Associate Degree",
//       branch: "Information Technology",
//       job_role: "IT Specialist",
//       industry: null,
//       skills: "Networking, Security, Troubleshooting",
//       specialization: "IT Support",
//       experience_in_years: 7,
//       experience_in_months: 2,
//       current_company: null,
//       current_salary: null,
//       notice_period_in_days: null,
//       resume:
//         "http://test-jobs.onrender.com/media/resumes/sample_resume_O5o5KVM.txt",
//       created_by: 4,
//       updated_by: 1,
//       updated_by_info: { id: 1, username: "admin", groups: [] },
//     },
//   ];
