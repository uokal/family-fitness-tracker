const pool = require("../config/db");

const logFitnessData = async (userId, steps, diet, tablet) => {
    return pool.query(
        "INSERT INTO fitness (user_id, steps, diet, tablet) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, steps, diet, tablet]
    );
};

const getFitnessData = async (userId) => {
    return pool.query("SELECT * FROM fitness WHERE user_id = $1", [userId]);
};

module.exports = { logFitnessData, getFitnessData };
