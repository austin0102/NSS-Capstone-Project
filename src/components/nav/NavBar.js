
import "./NavBar.css"

import { CustomerNavBar } from "./CustomerNav";
import { EmployeeNavBar } from "./EmployeeNav";


export const NavBar = () => {

    const localcurrentUser = localStorage.getItem("current_user");
    const currentUserObject = JSON.parse(localcurrentUser);

    if (currentUserObject.staff) {

        return <EmployeeNavBar />
    } else {

        return <CustomerNavBar />
    }

}