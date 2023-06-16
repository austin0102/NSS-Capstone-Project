import { EmployeeViews } from "./EmployeeViews.js";
import { CustomerViews } from "./CustomerViews.js";

export const ApplicationViews = () => {
	
    const localcurrentUser = localStorage.getItem("current_user");
    const currentUserObject = JSON.parse(localcurrentUser);

    if (currentUserObject.staff) {

        return <EmployeeViews />
    } else {

        return <CustomerViews />
    }
    
}