import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import ToDo from "./components/todo/ToDo";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container">
      <header>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<ToDo loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
