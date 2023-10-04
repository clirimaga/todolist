import { useNavigate } from "react-router-dom";
import './Login.css';
export default function Login() {
const navigate = useNavigate();

  return (
    <form onSubmit={() => navigate('/')}>
      <small>Please type in your credentials...</small>
      <>
      <label htmlFor="email">Email Adress</label>
      <input id="email" type="email" />
      </>
      <>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
      </>
      <input type='submit'/>
    </form>
  );
}
