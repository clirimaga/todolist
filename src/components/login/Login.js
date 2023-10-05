import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    navigate("/");
  };
  console.log(loggedIn);
  return (
    <form onSubmit={handleSubmit}>
      <small>Please type in your credentials...</small>
      <>
        <label htmlFor="email">Email Adress</label>
        <input id="email" type="email" />
      </>
      <>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </>
      <input type="submit" />
    </form>
  );
}
