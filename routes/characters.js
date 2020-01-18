const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

// gets all characters  for user
router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM archetypes WHERE id = $1', [15]);
    res.json(rows[0])
})

// update list of characters with their information
router.post('/save', async (req, res) => {
    const { characters } = req.body;
    const {Warrior, Magician, Bowman, Thief, Pirate, Lab} = characters;
    const text = 'UPDATE archetypes SET "Warrior" = $1, "Magician" = $2, "Bowman" = $3, "Thief" = $4, "Pirate" = $5, "Lab" = $6 WHERE id = $7';
    const parameters = [Warrior, Magician, Bowman, Thief, Pirate, Lab, 15];
    const result = await db.query(text, parameters);
    if(result){
        res.status(200).send(result)
    }
    else {
        res.sendStatus(500);
    }
})

module.exports = router;