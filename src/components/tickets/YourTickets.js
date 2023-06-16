
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets.css";

export const UserTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const localcurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localcurrentUser);
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
          </section>
        ))}
      </article>
      <button onClick={handleGoBack}>Go Back</button>
    </>
  );
};
