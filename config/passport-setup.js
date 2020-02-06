const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { google, facebook } = require('./keys');
const db = require('../db');

async function queryForUser(id) {
    const query = {
        text: 'SELECT * FROM user_info WHERE id = $1 LIMIT 1',
        values: [id]
    };
    try {
        const { rows } = await db.query(query);
        return rows.length !== 0 ? rows : false;
    }
    catch(err) {
        console.error(err);
    }
}

async function addUserToDatabase(profile) {
    const { id, displayName } = profile;
    const query = {
        text: 'INSERT INTO user_info(id, name) VALUES ($1, $2)',
        values: [id, displayName]
    }
    try {
        const result = await db.query(query);
        console.log({ result })
    }
    catch(err) {
        console.error(err);
    }
}

async function addUserPresets(id) {
    const query = {
        text: 'INSERT INTO presets("user", "preset") VALUES ($1, 1), ($1, 2), ($1, 3), ($1, 4), ($1, 5)',
        values: [id]
    }
    try {
        const result = await db.query(query);
        console.log({ result })
    }
    catch(err) {
        console.error(err);
    }
}

passport.serializeUser((id, done) => {
    done(null, id);
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: google.clientID,
        clientSecret: google.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        let { id } = profile;
        let isUserInDatabase = await queryForUser(id);
        if( isUserInDatabase ) {
            done(null, id)
        }
        else {
            const result = await addUserToDatabase(profile);
            const presets = await addUserPresets(profile.id);
            console.log({ result, presets });
            done(null, id)
        }
    })
)

passport.use(
    new FacebookStrategy({
        callbackURL: '/auth/facebook/redirect',
        clientID: facebook.clientID,
        clientSecret: facebook.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        let { id } = profile;
        let isUserInDatabase = await queryForUser(id);
        if( isUserInDatabase ) {
            done(null, id);
        }
        else {
            const result = await addUserToDatabase(profile);
            const presets = await addUserPresets(profile.id);
            console.log({ result, presets });
            done(null, id);
        }
    })
)