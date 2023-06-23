import { Route, Routes, Outlet } from "react-router-dom"
import "./Views.css"
import { TicketList } from "../tickets/TicketList"
import { AddSkill } from "../tickets/AddTraining"




export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Allen's Auto Shop</h1>
                    <div></div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketList />} />
                <Route path="add/training" element={<AddSkill />} />

            </Route>
        </Routes>
    )
}