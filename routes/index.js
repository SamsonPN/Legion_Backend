const auth = require('./auth');
const characters = require('./characters');
const presets = require('./presets');
const options = require('./options');

module.exports = app => {
    app.use('/auth', auth);
    app.use('/characters', characters)
    app.use('/presets', presets)
    app.use('/options', options)
}