const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

// gets all presets for user
router.get('/', async (req, res) => {
    const query = {
        text: 'SELECT characters, preset, stats FROM presets WHERE "user" = $1 ORDER BY preset',
        values: [req.user]
    }
    try {
        const { rows } = await db.query(query);
        res.json(rows);
    }
    catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
})

router.post('/save', async (req, res) => {
    const { currentPreset, presetNumber, statPositions } = req.body;
    const presetQuery = {
        text: 'UPDATE presets SET "characters" = $1 WHERE "user" = $2 AND "preset" = $3',
        values: [currentPreset, req.user, presetNumber]
    };
    const statQuery = {
        text: 'UPDATE presets SET "stats" = $1 WHERE "user" = $2 AND "preset" = $3',
        values: [statPositions, req.user, presetNumber]
    };

    try {
        const query1 = await db.query(presetQuery);
        const query2 = await db.query(statQuery);
        res.status(200).send({query1, query2});
    }
    catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
})

router.delete('/delete', async (req, res) => {
    const query = {
        text: 'DELETE FROM presets WHERE "user" = $1 RETURNING *',
        values: ['3276696012356931'] //replace with req.user
    }
    try {
        const result = await db.query(query); 
        console.log({ result })
        res.end();
    }
    catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
})

module.exports = router;