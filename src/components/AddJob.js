import React, { useEffect, useState } from "react";

const JobPostingForm = () => {
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
      formData.append("posting_title", event.target.posting_title.value);
      formData.append("gender", event.target.gender.value);
      formData.append("contact_no", event.target.contact_no.value);
      formData.append("location", event.target.location.value);
      formData.append("category", event.target.category.value);
      formData.append("status", event.target.status.value);
      formData.append("requirement", event.target.requirement.value);
      formData.append("skills", skillsPlainText);
      formData.append("work_experience", event.target.work_experience.value);
      formData.append("client", 4);

      const response = await fetch(
        "https://test-jobs.onrender.com/job/api/add/",
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
        <h2>Job Posting</h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "130vh",
        }}
      >
        <div style={{ width: "30%" }}>
        <div className="mb-3">
            <label className="form-label">Position Title</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="posting_title"
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
            <label className="form-label">Contact Number</label>
            <input
              type="number"
              className="form-control"
              name="contact_no"
              placeholder="+91"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Pune"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="category"
              required
            >
              <option>Select Status</option>
              {dropdownData.category &&
                dropdownData.category.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>

          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              required
            >
              <option>Select Status</option>
              {dropdownData.job_status &&
                dropdownData.job_status.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>

          </div>
          <div className="mb-3">
            <label className="form-label">Requirement</label>
            <textarea
              type="text"
              name="requirement"
              className="form-control"
              placeholder="Requirement"
              required
            />
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
            <label className="form-label">Work Experience</label>
            <input
              type="Number"
              name="work_experience"
              className="form-control"
              placeholder="Example: 5"
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
         

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobPostingForm;
