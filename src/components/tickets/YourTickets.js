import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets.css";

export const UserTicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const localCurrentUser = localStorage.getItem("current_user");
    const currentUserObject = JSON.parse(localCurrentUser);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8088/tickets?_expand=service`)
            .then((res) => res.json())
            .then((ticketArray) => {
                const filteredTickets = ticketArray.filter(
                    (ticket) => ticket.userId === currentUserObject.id
                );
                setTickets(filteredTickets);
                setFilteredTickets(filteredTickets);
            });
    }, [currentUserObject.id]);

    const handleGoBack = () => {
        navigate("/tickets/add");
    };

    const handleFilterOpen = () => {
        const openTickets = tickets.filter((ticket) => !ticket.isComplete);
        setFilteredTickets(openTickets);
    };

    const handleFilterCompleted = () => {
        const completedTickets = tickets.filter((ticket) => ticket.isComplete);
        setFilteredTickets(completedTickets);
    };

    const handleShowAll = () => {
        setFilteredTickets(tickets);
    };

    const handleDeleteTicket = (ticketId) => {
        fetch(`http://localhost:8088/tickets/${ticketId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
                setTickets(updatedTickets);
                setFilteredTickets(updatedTickets);
            })
            .catch((error) => {
                console.error("Error deleting ticket:", error);
            });
    };

    const handleUpdateTicket = (ticketId) => {
        navigate(`/ticket/update/${ticketId}`);
    };

    return (
        <>
            <h2>List of Tickets</h2>
            <div className="button-group">
                <button onClick={handleFilterOpen}>Open Tickets</button>
                <button onClick={handleFilterCompleted}>Completed Tickets</button>
                <button onClick={handleShowAll}>Show All</button>
            </div>
            <article className="tickets">
                {filteredTickets.map((ticket) => (
                    <section className="ticket" key={ticket.id}>
                        <div>
                            <strong>{ticket?.service?.name}</strong>
                        </div>
                        <div>{ticket.make}</div>
                        <div>{ticket.model}</div>
                        <div>{ticket.yearMade}</div>
                        <div>{ticket.licensePlate}</div>
                        {ticket.isComplete ? (
                            <div className="completed-ticket">
                                <strong>Completed</strong>
                            </div>
                        ) : (
                            <>
                                {ticket.isClaimed ? (
                                    <div className="claimed-ticket">
                                        Your vehicle is currently being worked on
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={() => handleDeleteTicket(ticket.id)}>
                                            Delete
                                        </button>
                                        <button onClick={() => handleUpdateTicket(ticket.id)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </section>
                ))}
            </article>
            <button className="go-back" onClick={handleGoBack}>
                Go Back
            </button>
        </>
    );
};
