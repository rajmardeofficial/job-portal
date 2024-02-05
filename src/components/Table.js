import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Table.css";

const Table = ({ fetchedData }) => {
  const [data, setData] = useState(fetchedData || []);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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
        return isAsc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
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

  const columnConfig = Object.keys(data[0] || {}).reduce((acc, key) => {
    if (!excludedColumns.includes(key)) {
      acc[key] = getFriendlyColumnName(key);
    }
    return acc;
  }, {});

  const filteredData = data.filter((row) => {
    const searchableValues = Object.values(row).join(" ").toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return searchableValues.includes(searchTermLower);
  });

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
