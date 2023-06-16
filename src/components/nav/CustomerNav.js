import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="your/tickets">Your Tickets</Link>
            </li>
            {
                localStorage.getItem("current_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("current_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}




