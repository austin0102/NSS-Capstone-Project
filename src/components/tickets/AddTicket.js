import React, { useState } from "react";
import "./Tickets.css";

export const AddTicket = () => {
    const [ticket, setTicket] = useState({
        serviceId: 0,
        userId: 0,
        make: "",
        model: "",
        yearMade: 2023,
        licensePlate: "",
        isComplete: false,
        isClaimed: false,
    });

    const localCurrentUser = localStorage.getItem("current_user");
    const currentUserObject = JSON.parse(localCurrentUser);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const serviceToSendToAPI = {
            serviceId: ticket.serviceId,
            userId: currentUserObject.id,
            make: ticket.make,
            model: ticket.model,
            yearMade: ticket.yearMade,
            licensePlate: ticket.licensePlate,
            isComplete: ticket.isComplete,
            isClaimed: ticket.isClaimed,
        };

        fetch("http://localhost:8088/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => {
                window.alert("Your ticket has been submitted."); // Display window alert
                window.location.reload(); // Reload the page
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <form className="Addservice">
            <h2 className="serviceForm__title">Please Select a Service</h2>
            <div className="boxes">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="type">Service:</label>
                        <select
                            className="form-control"
                            value={ticket.serviceId}
                            onChange={(evt) =>
                                setTicket({ ...ticket, serviceId: parseInt(evt.target.value) })
                            }
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
                            onChange={(evt) =>
                                setTicket({ ...ticket, make: evt.target.value })
                            }
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
                            onChange={(evt) =>
                                setTicket({ ...ticket, model: evt.target.value })
                            }
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
                            onChange={(evt) =>
                                setTicket({ ...ticket, yearMade: parseInt(evt.target.value) })
                            }
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="licensePlate">License Plate:</label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="form-control"
                            placeholder="License Plate"
                            value={ticket.licensePlate}
                            onChange={(evt) =>
                                setTicket({ ...ticket, licensePlate: evt.target.value })
                            }
                        />
                    </div>
                </fieldset>
            </div>
            <button onClick={handleSaveButtonClick} className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};
