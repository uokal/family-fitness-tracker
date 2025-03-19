const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!['Grandfather', 'Father', 'Child'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = await User.create({ username, password, role });
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, role: user.role, username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
