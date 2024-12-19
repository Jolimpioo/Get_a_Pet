import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* components */
import Navbar from "./components/layout/Navbar.js";
import Footer from "./components/layout/Footer.js";
import Container from "./components/layout/Container.js";

/* pages */
import Login from "./components/pages/Auth/Login.js";
import Register from "./components/pages/Auth/Register.js";
import Home from "./components/pages/Home.js";

/* context */
import { UserProvider } from "./context/UserContext.js";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
