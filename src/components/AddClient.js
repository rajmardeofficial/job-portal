import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClient = () => {
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
      formData.append("md_name", event.target.md_name.value);
      formData.append("contact_no", event.target.contact_no.value);
      formData.append("email_id", event.target.email_id.value);
      formData.append("category", event.target.category.value);
      formData.append("hr_name", event.target.hr_name.value);
      formData.append("hr_email_id", event.target.hr_email_id.value);
      formData.append("industry",  event.target.industry.value);
      formData.append("website", event.target.website.value);
      formData.append("address_line", event.target.address_line.value);
      formData.append("city", event.target.city.value);
      formData.append("state", event.target.state.value);
      formData.append("pin_code", event.target.pin_code.value);
      formData.append("paid_amount", event.target.paid_amount.value);
      formData.append("on_percentage", event.target.on_percentage.value);

      

      formData.append("client", 4);

      const response = await fetch(
        "https://test-jobs.onrender.com/client/api/add/",
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
      toast.success("Form submitted successfully!")
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
          height: "180vh",
        }}
      >
        <div style={{ width: "30%" }}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="Text"
              className="form-control"
              name="name"
              placeholder="Cognizant"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">MD Name</label>
            <input
              type="Text"
              className="form-control"
              name="md_name"
              placeholder=""
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Id</label>
            <input
              type="Text"
              className="form-control"
              name="email_id"
              placeholder="abc@gmail.com"
              required
            />
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
            <label className="form-label">HR Name</label>
            <input
              type="Text"
              className="form-control"
              name="hr_name"
              placeholder="Abc"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">HR Email Id</label>
            <input
              type="Text"
              className="form-control"
              name="hr_email_id"
              placeholder="hr@gmail.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Industry</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="industry"
              required
            >
              <option>Select Industry</option>
              {dropdownData.industry &&
                dropdownData.industry.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>

          </div>

          <div className="mb-3">
            <label className="form-label">Website</label>
            <input
              type="Text"
              className="form-control"
              name="website"
              placeholder="https://www.website.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address line</label>
            <input
              type="Text"
              className="form-control"
              name="address_line"
              placeholder=""
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="Pune"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              placeholder="Maharashtra"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pin Code</label>
            <input
              type="text"
              name="pin_code"
              className="form-control"
              placeholder="411005"
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
            <label className="form-label">Paid Amount</label>
            <input
              type="text"
              name="paid_amount"
              className="form-control"
              placeholder=""
              required
            />
          </div>

    
          <div className="mb-3">
            <label className="form-label">On Percentage</label>
            <textarea
              type="text"
              name="on_percentage"
              className="form-control"
              placeholder=""
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
        <ToastContainer /> 
      </div>
     
    </form>
  );
};

export default AddClient;
