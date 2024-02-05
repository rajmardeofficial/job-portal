import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import logo from "../logo.png"

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logoStyle = {
    maxWidth: "200px",
    maxHeight: "200px"
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          
          <img src={logo} alt="logo here" width={120} style={logoStyle}/>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`} style={{zIndex: 1}}>
          <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/candidatetable">Candidate List</Link>
            </li>
            <li>
            <Link to="/joblist">Job List</Link>
            </li>
            <li>
            <Link to="/clientlist">Client List</Link>
            </li>
            <li>
            <Link to="/interviewlist">Interview List</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

export default Navbar;
