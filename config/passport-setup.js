const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        passReqToCallback: true,
        clientID: '',
        clientSecret: ''
    }, (req, accessToken, refreshToken, profile, done) => {
        // callback here!
        }
    )
)

passport.use(
    new FacebookStrategy({
        callbackURL: '/auth/facebook/redirect',
        passReqToCallback: true,
        clientID: '',
        clientSecret: ''
    }, (req, accessToken, refreshToken, profile, done) => {
        // callback here!
        }
    )
)