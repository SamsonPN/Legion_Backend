const Router = require('express-promise-router');
const router = new Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:8080/#/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    res.redirect('http://localhost:8080/#/home');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    console.log(req.user);
    res.redirect('http://localhost:8080/#/home');
})

module.exports = router;