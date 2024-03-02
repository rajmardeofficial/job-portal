import React, { useEffect, useState } from "react";

const CandidateForm = () => {
  let skillTagStyle = {
    display: "inline",
    backgroundColor: "#424769",
    borderRadius: "10%",
    marginLeft: "5px",
    color: "white",
    padding: "5px",
  };

  let [skills, setSkills] = useState([]);
  let [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const fetchDataAsync = async () => {
      try {
        const dropDownResponse = await fetch(
          "https://test-jobs.onrender.com/job/api/dropdowns/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (!dropDownResponse.ok) {
          throw new Error("Failed to fetch dropdown data");
        }

        const dropDownData = await dropDownResponse.json();
        setDropdownData(dropDownData);
        console.log(dropDownData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchDataAsync();
  }, []);

  const handleChange = (event) => {
    // Convert the selected options to an array
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    // Concatenate the newly selected skills with the existing ones
    setSkills((prevSkills) => [...prevSkills, ...selectedOptions]);
  };

  const handleDeleteSkill = (skillToDelete) => {
    // Filter out the skill to delete from the array
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToDelete)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Convert skills array to plain text with comma-separated values
    const skillsPlainText = skills.join(", ");
    try {
      const storedToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("name", event.target.name.value);
      formData.append("gender", event.target.gender.value);
      formData.append("mobile_no", event.target.mobile_no.value);
      formData.append("email", event.target.email.value);
      formData.append("current_location_city", event.target.current_location_city.value);
      formData.append("permanent_location_city", event.target.permanent_location_city.value);
      formData.append("higher_education", event.target.higher_education.value);
      formData.append("branch", event.target.branch.value);
      formData.append("job_role", event.target.job_role.value);
      formData.append("skills", skillsPlainText);
      formData.append("specialization", event.target.specialization.value);
      formData.append("experience_in_years", event.target.experience_in_years.value);
      formData.append("experience_in_months", event.target.experience_in_months.value);
      formData.append("resume", event.target.resume.files[0]);

      const response = await fetch(
        "https://test-jobs.onrender.com/candidate/api/add/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form submitted successfully!");
      // Clear form fields or show success message as needed
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mt-3">
        <h2>Candidate Form</h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200vh",
        }}
      >
        <div style={{ width: "30%" }}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="gender"
              required
            >
              <option>Select Gender</option>
              {dropdownData.gender &&
                dropdownData.gender.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              name="mobile_no"
              placeholder="+91"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              required
              name="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Current City</label>
            <input
              type="text"
              name="current_location_city"
              className="form-control"
              placeholder="Current Location City"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Permanent City</label>
            <input
              type="text"
              name="permanent_location_city"
              className="form-control"
              placeholder="Permanent Location City"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Higher Education</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="higher_education"
              required
            >
              <option>Select Higher Education</option>
              {dropdownData.higher_education &&
                dropdownData.higher_education.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Branch</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="branch"
              required
            >
              <option>Select Branch</option>
              {dropdownData.branch &&
                dropdownData.branch.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Job Role</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="job_role"
              required
            >
              <option>Select Job Role</option>
              {dropdownData.job_role &&
                dropdownData.job_role.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Skills</label>
            {/* Render skills from the array */}
            {skills.length > 0 &&
              skills.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ marginBottom: "10px", display: "inline-block" }}
                  >
                    <p style={skillTagStyle}>{item}</p>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteSkill(item)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                );
              })}
            <select
              onChange={handleChange}
              multiple
              className="form-select"
              aria-label="Default select example"
              name="skills"
              required
            >
              {dropdownData.skills &&
                dropdownData.skills.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              name="specialization"
              className="form-control"
              placeholder="Ex. IT Support"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Experience in Years</label>
            <input
              type="Number"
              name="experience_in_years"
              className="form-control"
              placeholder="Example: 5"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Experience in Months</label>
            <input
              type="Number"
              name="experience_in_months"
              className="form-control"
              placeholder="Example: 2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Resume</label>
            <input
              type="file"
              name="resume"
              className="form-control"
              placeholder="Click Here"
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CandidateForm;
