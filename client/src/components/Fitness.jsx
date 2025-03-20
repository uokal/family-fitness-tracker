import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Fitness = () => {
    const [fitnessData, setFitnessData] = useState([]);
    const [formData, setFormData] = useState({
        startTime: '',
        endTime: '',
        steps: '',
        waterDrink: '',
        otherDiet: ''
    });

    const token = localStorage.getItem('token');

    const axiosInstance = axios.create({
        baseURL: 'https://family-fitness-tracker.onrender.com/api/fitness',
        headers: { Authorization: `Bearer ${token}` }
    });

    const fetchFitnessData = async () => {
        try {
            const { data } = await axiosInstance.get('/get');
            setFitnessData(data);
        } catch (error) {
            console.error('Error fetching fitness data:', error);
            toast.error('Failed to fetch fitness data');
        }
    };

    useEffect(() => {
        fetchFitnessData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/', formData);
            toast.success('Entry added successfully');
            setFormData({
                startTime: '',
                endTime: '',
                steps: '',
                waterDrink: '',
                otherDiet: ''
            });
            fetchFitnessData();
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error(error.response?.data?.error || 'Failed to add entry');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/${id}`);
            toast.success('Entry deleted successfully');
            fetchFitnessData();
        } catch (error) {
            console.error('Error deleting entry:', error);
            toast.error('Failed to delete entry');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Fitness Tracker</h2>

            <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Steps</Form.Label>
                    <Form.Control
                        type="number"
                        name="steps"
                        value={formData.steps}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Water Drank (Liters)</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.1"
                        name="waterDrink"
                        value={formData.waterDrink}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Other Diet</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="otherDiet"
                        value={formData.otherDiet}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" className="mt-3">Add Entry</Button>
            </Form>

            <h4>Fitness Records</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Steps</th>
                        <th>Water Drank</th>
                        <th>Other Diet</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fitnessData.map((entry) => (
                        <tr key={entry.id}>
                            <td>{new Date(entry.startTime).toLocaleString()}</td>
                            <td>{new Date(entry.endTime).toLocaleString()}</td>
                            <td>{entry.steps}</td>
                            <td>{entry.waterDrink}L</td>
                            <td>{entry.otherDiet || '-'}</td>
                            <td>{entry.User?.username || 'N/A'}</td>
                            <td>{entry.User?.role || 'N/A'}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(entry.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Fitness;
