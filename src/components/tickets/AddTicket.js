import React, { useState } from "react";


export const AddTicket = () => {
  const [ticket, updateTicket] = useState({
    serviceId: 0,
    userId: 0,
    make: "",
    model: "",
    yearMade: 2023,
    isComplete: false,
  });

 

  const localcurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localcurrentUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const productToSendToAPI = {
      serviceId: ticket.serviceId,
      userId: currentUserObject.id,
      make: ticket.make,
      model: ticket.model,
      yearMade: ticket.yearMade,
      isComplete: ticket.isComplete,
    };

    return fetch("http://localhost:8088/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

 

  return (
    <form className="AddProduct">
      <h2 className="productForm__title">Please Select a Service</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="type">Service:</label>
          <select
            className="form-control"
            value={ticket.serviceId}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.serviceId = parseInt(evt.target.value);
              updateTicket(copy);
            }}
          >
            <option value="">Select a Service</option>
            <option value="1">Oil Change</option>
            <option value="2">Tire Rotation</option>
            <option value="3">Wheel Alignment</option>
            <option value="4">Brake Replacement</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Vehicle Make:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Make"
            value={ticket.make}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.make = evt.target.value;
              updateTicket(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="model">Vehicle Model:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Model"
            value={ticket.model}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.model = evt.target.value;
              updateTicket(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="year">Vehicle Year:</label>
          <input
            required
            autoFocus
            type="number"
            className="form-control"
            placeholder="Year"
            value={ticket.yearMade}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.yearMade = parseInt(evt.target.value);
              updateTicket(copy);
            }}
          />
        </div>
      </fieldset>

      <button onClick={handleSaveButtonClick} className="btn btn-primary">
        Submit
      </button>
     
    </form>
  );
};
