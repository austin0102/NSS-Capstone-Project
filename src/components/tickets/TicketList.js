import React, { useEffect, useState } from "react";
import "./Tickets.css";

export const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const localcurrentUser = localStorage.getItem("current_user");
    const currentUserObject = JSON.parse(localcurrentUser);

    useEffect(() => {
        fetch("http://localhost:8088/tickets?_expand=service")
            .then((res) => res.json())
            .then((ticketArray) => {
                setTickets(ticketArray);
            });

        fetch("http://localhost:8088/employeeskills?_expand=employee&_expand=service")
            .then((res) => res.json())
            .then((employeeSkillsArray) => {
                // Filter the employee skills to find the services associated with the current user
                const currentUserSkills = employeeSkillsArray
                    .filter((skill) => skill.employee.userId === currentUserObject.id)
                    .map((skill) => skill.service.name);

                setUserServices(currentUserSkills);
            });
    }, []);

    const handleComplete = (ticketId) => {
        // Update the tickets state by marking the selected ticket as complete
        const updatedTickets = tickets.map((ticket) => {
            if (ticket.id === ticketId) {
                return {
                    ...ticket,
                    isComplete: true,
                };
            }
            return ticket;
        });

        setTickets(updatedTickets);

        // Find the updated ticket from the list
        const updatedTicket = updatedTickets.find((ticket) => ticket.id === ticketId);
        const { serviceId, userId, make, model, yearMade, licensePlate } = updatedTicket;

        fetch(`http://localhost:8088/tickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isComplete: true,
                serviceId,
                userId,
                make,
                model,
                yearMade,
                licensePlate,
                isClaimed: true
            }),
        })
            .then((res) => res.json())
            .then((updatedTicket) => {
                console.log("Ticket updated:", updatedTicket);
                // Handle the response as needed
                // Remove the ticket from the list
                setTickets((prevTickets) =>
                    prevTickets.filter((ticket) => ticket.id !== ticketId)
                );
            })
            .catch((error) => {
                console.error("Error updating ticket:", error);
                // Handle the error as needed
            });
    };

    const handleClaim = (ticketId) => {
        const updatedTickets = tickets.map((ticket) => {
            if (ticket.id === ticketId) {
                return {
                    ...ticket,
                    isClaimed: true,
                };
            }
            return ticket;
        });

        setTickets(updatedTickets);

        const updatedTicket = updatedTickets.find((ticket) => ticket.id === ticketId);

        fetch(`http://localhost:8088/tickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTicket),
        })
            .then((res) => res.json())
            .then((updatedTicket) => {
                console.log("Ticket updated:", updatedTicket);
                // Handle the response as needed
            })
            .catch((error) => {
                console.error("Error updating ticket:", error);
                // Handle the error as needed
            });
    };

    // Filter the tickets to get the open tickets associated with the user services
    const openTickets = tickets.filter((ticket) => !ticket.isComplete);

    const filteredTickets = openTickets.filter((ticket) =>
        userServices.includes(ticket?.service?.name)
    );

    return (
        <>
            <h2>List of Tickets</h2>
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
                        {!ticket.isComplete && !ticket.isClaimed && (
                            <button
                                onClick={() => handleClaim(ticket.id)}
                                className="claim-button"
                            >
                                Claim
                            </button>
                        )}
                        {ticket.isClaimed && (
                            <div>This ticket has been claimed</div>
                        )}
                        {ticket.isClaimed && !ticket.isComplete && (
                            <button
                                onClick={() => handleComplete(ticket.id)}
                                className="complete-button"
                            >
                                Complete
                            </button>
                        )}
                    </section>
                ))}
            </article>
        </>
    );
};
