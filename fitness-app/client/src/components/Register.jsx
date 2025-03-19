import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select a role.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/register", form);
      alert("User registered successfully!");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </Form.Group>
           <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>
        

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={form.role} // ✅ Ensure role is always set
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="-">Select Option</option>
            <option value="Grandfather">Grandfather</option>
            <option value="Father">Father</option>
            <option value="Child">Child</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
}
