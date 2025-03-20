import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./context/PrivateRoute";
import PublicRoute from "./context/PublicRoute";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Fitness from "./components/Fitness";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/">Family Health Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/fitness">Fitness</Nav.Link>
                <Nav.Link disabled className="text-light">
                  {user?.role} - {user?.username}
                </Nav.Link>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/fitness" element={<PrivateRoute><Fitness /></PrivateRoute>} />
        </Routes>
      </Container>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </Router>
  );
}

export default App;
