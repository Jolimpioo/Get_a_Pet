import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* components */
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Container from './components/layout/Container.js';
import Message from './components/layout/Message.js';

/* pages */
import Login from './components/pages/Auth/Login.js';
import Register from './components/pages/Auth/Register.js';
import Home from './components/pages/Home.js';
import Profile from './components/pages/User/Profile.js';
import MyPets from './components/pages/Pet/MyPets.js';
import AddPet from './components/pages/Pet/AddPet.js';
import PetDetails from './components/pages/Pet/PetDetails.js';
import EditPet from './components/pages/Pet/EditPet.js';

/* context */
import { UserProvider } from './context/UserContext.js';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
