const express = require('express');
const {
    createFitnessEntry,
    getFitnessData,
    updateFitnessEntry,
    deleteFitnessEntry
} = require('../controllers/fitness.controller');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createFitnessEntry);
router.get('/get', authenticate, getFitnessData);
router.put('/:id', authenticate, updateFitnessEntry);
router.delete('/:id', authenticate, deleteFitnessEntry);

module.exports = router;
