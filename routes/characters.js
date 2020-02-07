const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

// gets all characters  for user
router.get('/', async (req, res) => {
    const query = {
        text: 'SELECT "Warrior", "Magician", "Bowman", "Thief", "Pirate", "Lab"  FROM archetypes WHERE "user" = $1',
        values: [req.user]
    }
    try {
        const { rows } = await db.query(query);
        res.json(rows[0])
    }
    catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
})

// update list of characters with their information
router.post('/save', async (req, res) => {
    const { characters } = req.body;
    const {Warrior, Magician, Bowman, Thief, Pirate, Lab} = characters;
    const query = {
        text: 'UPDATE archetypes SET "Warrior" = $1, "Magician" = $2, "Bowman" = $3, "Thief" = $4, "Pirate" = $5, "Lab" = $6 WHERE "user" = $7',
        values: [Warrior, Magician, Bowman, Thief, Pirate, Lab, req.user]
    }
    try {
        const result = await db.query(query);
        res.status(200).send(result)
    }
    catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
})

module.exports = router;