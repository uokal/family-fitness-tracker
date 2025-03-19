require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
});
