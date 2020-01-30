const characters = require('./characters');
const presets = require('./presets');
const auth = require('./auth');

module.exports = app => {
    app.use('/auth', auth);
    app.use('/characters', characters)
    app.use('/presets', presets)
}