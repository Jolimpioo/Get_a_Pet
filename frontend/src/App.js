import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* components */
import Navbar from "./components/layout/Navbar.js";
import Footer from "./components/layout/Footer.js";

/* pages */
import Login from "./components/pages/Auth/Login.js";
import Register from "./components/pages/Auth/Register.js";
import Home from "./components/pages/Home.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
