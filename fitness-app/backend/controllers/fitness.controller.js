const Fitness = require('../models/fitnessModel');
const User = require('../models/userModel');

// ✅ Create Fitness Entry
exports.createFitnessEntry = async (req, res) => {
    try {
        const { startTime, endTime, steps, waterDrink, otherDiet } = req.body;
        const userId = req.user.id;

        const fitnessEntry = await Fitness.create({ startTime, endTime, steps, waterDrink, otherDiet, userId });
        res.status(201).json(fitnessEntry);
    } catch (error) {
        console.error('Error creating fitness entry:', error);
        res.status(500).json({ message: 'Error creating fitness entry', error: error.message || error });
    }
};

// ✅ Get Fitness Data Based on Role
exports.getFitnessData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        let fitnessData;

        if (userRole === 'Grandfather') {
            fitnessData = await Fitness.findAll({ include: [{ model: User, attributes: ['username', 'role'] }] });
        } else if (userRole === 'Father') {
            const children = await User.findAll({ where: { role: 'Child' } });
            const childIds = children.map(child => child.id);
            fitnessData = await Fitness.findAll({ where: { userId: [userId, ...childIds] } });
        } else {
            fitnessData = await Fitness.findAll({ where: { userId } });
        }

        res.json(fitnessData);
    } catch (error) {
        console.error('Error fetching fitness data:', error);
        res.status(500).json({ message: 'Error fetching fitness data', error: error.message || error });
    }
};

// ✅ Update Fitness Entry
exports.updateFitnessEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime, steps, waterDrink, otherDiet } = req.body;
        const userId = req.user.id;

        const entry = await Fitness.findOne({ where: { id, userId } });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });

        await entry.update({ startTime, endTime, steps, waterDrink, otherDiet });
        res.json({ message: 'Entry updated successfully', entry });
    } catch (error) {
        console.error('Error updating fitness entry:', error);
        res.status(500).json({ message: 'Error updating entry', error: error.message || error });
    }
};

// ✅ Delete Fitness Entry
exports.deleteFitnessEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        console.log('Deleting Entry - Entry ID:', id, 'User ID:', userId);

        // Check if the entry exists
        const entry = await Fitness.findOne({ where: { id } });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });

        // Check if the user owns the entry
        if (entry.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this entry' });
        }

        await entry.destroy();
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting fitness entry:', error);
        res.status(500).json({ message: 'Error deleting entry', error: error.message || error });
    }
};

