import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function DashboardWithCharts() {
  const { user, logout } = useContext(AuthContext);
  const [fitnessData, setFitnessData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://family-fitness-tracker.onrender.com/api/fitness/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFitnessData(response.data);
      } catch (error) {
        console.error('Error fetching fitness data:', error);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <Container className="mt-5">
      <Alert variant="success">
        <h4>Welcome, {user?.role} - {user?.username}!</h4>
      </Alert>
      <Button variant="danger" onClick={logout}>Logout</Button>

      {fitnessData.length > 0 && (
        <Row className="mt-4">
          <Col md={6}>
            <h5>Steps vs Water Intake</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fitnessData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="User.username" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="steps" fill="#8884d8" />
                <Bar dataKey="waterDrink" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6}>
            <h5>Steps Over Time</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fitnessData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="startTime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="steps" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      )}
    </Container>
  );
}
