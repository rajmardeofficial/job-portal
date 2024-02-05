// components/FormComponent.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Col, Row } from "react-bootstrap";

const FormComponent = ({ dropdownData }) => {
  const [formData, setFormData] = useState({
    name: "",
    current_location_city: "",
    permanent_location_city: "",
    mobile_no: "",
    email: "",
    role: "",
    gender: "",
    skills: [],
    industry: "",
    higherEducation: "",
    resume: null, // Updated field for file upload
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else if (name === "resume") {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Store the file object in the state
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    if (value.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, value.trim()],
      });
    }
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="container mt-5 mb-5">
      <div
        style={{
          width: "60%",
          margin: "auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="mb-4 text-center">Candidate Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formName" className="mb-3">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formLocation" className="mb-3">
            <Form.Label column sm={2}>
              Current Location City
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter City Name"
                name="current_location_city"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formLocation" className="mb-3">
            <Form.Label column sm={2}>
              Permenant Location City
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter City Name"
                name="permanent_location_city"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formName" className="mb-3">
            <Form.Label column sm={2}>
              Mobile
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                placeholder="Enter your Number"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formName" className="mb-3">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Enter your Email-Id"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formRole" className="mb-3">
            <Form.Label column sm={2}>
              Role
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                {dropdownData &&
                  dropdownData.job_role &&
                  dropdownData.job_role.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGender" className="mb-3">
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                {dropdownData &&
                  dropdownData.gender &&
                  dropdownData.gender.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formSkills" className="mb-3">
            <Form.Label column sm={2}>
              Skills
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                multiple
                name="skills"
                value={formData.skills}
                onChange={handleSkillChange}
                style={{ height: "auto" }}
              >
                {dropdownData &&
                  dropdownData.skills &&
                  dropdownData.skills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
              </Form.Control>
              <div className="mt-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {skill}
                    <span
                      className="ms-2 cursor-pointer"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      &times;
                    </span>
                  </span>
                ))}
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formIndustry" className="mb-3">
            <Form.Label column sm={2}>
              Industry
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
              >
                <option value="">Select Industry</option>
                {dropdownData &&
                  dropdownData.industry &&
                  dropdownData.industry.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHigherEducation" className="mb-3">
            <Form.Label column sm={2}>
              Higher Education
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="higherEducation"
                value={formData.higherEducation}
                onChange={handleInputChange}
              >
                <option value="">Select Higher Education</option>
                {dropdownData &&
                  dropdownData.higher_education &&
                  dropdownData.higher_education.map((education, index) => (
                    <option key={index} value={education}>
                      {education}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formResume" className="mb-3">
            <Form.Label column sm={2}>
              Resume
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                accept=".pdf, .doc, .docx"
                name="resume"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FormComponent;
