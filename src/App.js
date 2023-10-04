import "./App.css";
import Header from "./components/header/Header";
import ToDo from "./components/todo/ToDo";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
