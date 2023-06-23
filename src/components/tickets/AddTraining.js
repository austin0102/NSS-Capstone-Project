
import "./Tickets.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddSkill = () => {
  const [skill, setSkill] = useState({
    employeeId: 0,
    serviceId: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const localCurrentUser = localStorage.getItem("current_user");
    const currentUserObject = JSON.parse(localCurrentUser);

    // Fetch the employee details using the user ID
    if (currentUserObject && currentUserObject.id) {
      fetch(`http://localhost:8088/employees?_expand=user&userId=${currentUserObject.id}`)
        .then((response) => response.json())
        .then((employees) => {
          if (employees.length > 0) {
            const copy = { ...skill };
            copy.employeeId = employees[0].id;
            setSkill(copy);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);



  const handleSaveButtonClick = () => {
    const skillToSendToAPI = {
      employeeId: skill.employeeId,
      serviceId: skill.serviceId,
    };

    return fetch("http://localhost:8088/employeeskills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        // Page reload will happen by default after the form submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleGoBack = () => {
    navigate("/tickets");
  };

  return (
    <form className="AddSkill">
      <fieldset className="box-holder">
        <div className="form-group">
          <label htmlFor="type"><strong>Services:</strong></label>
          <select
            className="form-control"
            value={skill.serviceId}
            onChange={(evt) => {
              const copy = { ...skill };
              copy.serviceId = parseInt(evt.target.value);
              setSkill(copy);
            }}
          >
            <option value="">Select a New Skill</option>
            <option value={1}>Oil Change</option>
            <option value={2}>Tire Rotation</option>
            <option value={3}>Wheel Alignment</option>
            <option value={4}>Brake Replacement</option>
          </select>
        </div>
      </fieldset>
      <div className="training-buttons">

        <button onClick={handleSaveButtonClick} className="btn btn-primary">
          Submit skill
        </button>

        <button onClick={handleGoBack} className="btn btn-secondary">
          Go Back
        </button>
      </div>
    </form>
  );
};

