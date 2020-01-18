const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

// gets all presets for user
router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT characters, preset, stats FROM presets WHERE "user" = $1 ORDER BY preset', [15]);
    res.json(rows);
})

router.post('/save', async (req, res) => {
    const { currentPreset, presetNumber, statPositions } = req.body;
    const presetQuery = {
        text: 'UPDATE presets SET "characters" = $1 WHERE "preset" = $2',
        values: [currentPreset, presetNumber]
    };
    const statQuery = {
        text: 'UPDATE presets SET "stats" = $1 WHERE "preset" = $2',
        values: [statPositions, presetNumber]
    };
    const query1 = await db.query(presetQuery);
    const query2 = await db.query(statQuery);
    if(query1 && query2){
        res.status(200).send({query1, query2});
    }
    else {
        res.sendStatus(500);
    }
})

module.exports = router;