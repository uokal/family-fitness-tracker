import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Button, Alert } from 'react-bootstrap';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Container className="mt-5">
      <Alert variant="success">
        <h4>Welcome,  {user?.role} - {user?.username}!</h4>
      </Alert>
      <Button variant="danger" onClick={logout}>Logout</Button>
    </Container>
  );
}
