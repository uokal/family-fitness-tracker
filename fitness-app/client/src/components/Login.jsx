import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container } from 'react-bootstrap';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Add useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) {
      navigate('/dashboard'); // ✅ Redirect to Dashboard after login
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Login</Button>
      </Form>
    </Container>
  );
}
