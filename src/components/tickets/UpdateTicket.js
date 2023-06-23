import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./Tickets.css";

export const TicketUpdate = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [updatedTicket, setUpdatedTicket] = useState({
        make: "",
        model: "",
        yearMade: 0,
        licensePlate: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8088/tickets/${ticketId}`)
            .then((res) => res.json())
            .then((data) => {
                setTicket(data);
                setUpdatedTicket(data);
            })
            .catch((error) => {
                console.error("Error fetching ticket:", error);
            });
    }, [ticketId]);

    const handleUpdateTicket = () => {
        fetch(`http://localhost:8088/tickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTicket),
        })
            .then((res) => res.json())
            .then((data) => {
                setTicket(data);
                window.alert("Your ticket has been updated.");
                navigate("/your/tickets");
            })
            .catch((error) => {
                console.error("Error updating ticket:", error);
            });
    };

    if (!ticket) {
        return <div>Loading...</div>;
    }

    const handleGoBack = () => {
        navigate("/your/tickets");
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
                            value={updatedTicket.serviceId}
                            onChange={(evt) =>
                                setUpdatedTicket({
                                    ...updatedTicket,
                                    serviceId: parseInt(evt.target.value),
                                })
                            }
                            name="serviceId"
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
                            value={updatedTicket.make}
                            onChange={(evt) =>
                                setUpdatedTicket({
                                    ...updatedTicket,
                                    make: evt.target.value,
                                })
                            }
                            name="make"
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
                            value={updatedTicket.model}
                            onChange={(evt) =>
                                setUpdatedTicket({
                                    ...updatedTicket,
                                    model: evt.target.value,
                                })
                            }
                            name="model"
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
                            value={updatedTicket.yearMade}
                            onChange={(evt) =>
                                setUpdatedTicket({
                                    ...updatedTicket,
                                    yearMade: parseInt(evt.target.value),
                                })
                            }
                            name="yearMade"
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
                            value={updatedTicket.licensePlate}
                            onChange={(evt) =>
                                setUpdatedTicket({
                                    ...updatedTicket,
                                    licensePlate: evt.target.value,
                                })
                            }
                            name="licensePlate"
                        />
                    </div>
                </fieldset>
            </div>


            <div className="update-buttons">
                <button onClick={handleUpdateTicket} className="btn btn-primary">
                    Save
                </button>
                <div className="button-space"></div> {/* Add a div for spacing */}
                <button onClick={handleGoBack} className="btn btn-secondary">
                    Go Back
                </button>
            </div>

        </form>
    );
};

