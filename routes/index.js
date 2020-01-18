const characters = require('./characters');
const presets = require('./presets');

module.exports = app => {
    app.use('/characters', characters)
    app.use('/presets', presets)
}