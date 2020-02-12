const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const query = {
        text: 'SELECT "options" FROM user_info WHERE id = $1',
        values: ['3276696012356931'] //replace with req.user
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

router.post('/save', async (req,res) => {
    const { options } = req.body;
    const query = {
        text: 'UPDATE user_info SET "options" = $1 WHERE id = $2',
        values: [options, '3276696012356931'] //replace with req.user
    }
    try {
        const { rows } = await db.query(query);
        res.json(rows[0]);
    }
    catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
})

module.exports = router;