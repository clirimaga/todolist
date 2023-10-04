import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <nav className="navbar">
      <h3>To Do List</h3>
      <ul>
        <li>
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </li>
        {location.pathname !== "/login" && (
          <li>
            <NavLink to="login" className="link">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
