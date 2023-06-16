import { Route, Routes, Outlet } from "react-router-dom"
import {  AddTicket } from "../tickets/AddTicket"
import { UserTicketList } from "../tickets/YourTickets"


export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Allen's Auto Shop</h1>
                    <div></div>

                    <Outlet />
                </>
            }>

                <Route path="tickets/add" element={ < AddTicket/>} />
                <Route path="your/tickets" element={ < UserTicketList/>} />
            </Route>
        </Routes>
    )
}