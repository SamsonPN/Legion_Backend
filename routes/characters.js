const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

// gets all characters  for user
router.get('/', async (req, res) => {
    const query = {
        text: 'SELECT * FROM archetypes WHERE id = $1',
        values: [15]
    }
    const { rows } = await db.query(query);
    res.json(rows[0])
})

// update list of characters with their information
router.post('/save', async (req, res) => {
    const { characters } = req.body;
    const {Warrior, Magician, Bowman, Thief, Pirate, Lab} = characters;
    const query = {
        text: 'UPDATE archetypes SET "Warrior" = $1, "Magician" = $2, "Bowman" = $3, "Thief" = $4, "Pirate" = $5, "Lab" = $6 WHERE id = $7',
        values: [Warrior, Magician, Bowman, Thief, Pirate, Lab, 15]
    }
    try {
        const result = await db.query(query);
        res.status(200).send(result)
    }
    catch(error) {
        res.sendStatus(500);
        console.error(error);
    }
})

module.exports = router;