import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header({ loggedIn, setLoggedIn }) {
  return (
    <nav className="navbar">
      <h3>To Do List</h3>
      <ul>
        <li>
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </li>
        {!loggedIn ? (
          <li>
            <NavLink to="login" className="link">
              Login
            </NavLink>
          </li>
        ) : (
          <li onClick={() => setLoggedIn(false)}>
            <NavLink to="/login" className="link">
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
