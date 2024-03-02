import React from "react";

const ResumeLinkRenderer = ({ value }) => {
  return (
    <a href={value} target="_blank" rel="noopener noreferrer">
      View Resume
    </a>
  );
};

export default ResumeLinkRenderer;
