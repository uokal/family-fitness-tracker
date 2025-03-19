const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { logFitnessData, getFitnessData } = require("../models/fitnessModel");

const router = express.Router();

router.post("/log", authMiddleware, async (req, res) => {
    const { steps, diet, tablet } = req.body;
    try {
        const fitness = await logFitnessData(req.user.id, steps, diet, tablet);
        res.status(201).json(fitness.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/data", authMiddleware, async (req, res) => {
    try {
        const fitness = await getFitnessData(req.user.id);
        res.json(fitness.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
