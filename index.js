const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');
const { passportSetup } = require('./config/passport-setup');
const { session } = require('./config/keys');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mountRoutes = require('./routes');
const oneWeek = 7 * 24 * 60 * 60 * 1000;

app.use(cookieSession({
    maxAge: oneWeek,
    keys: [session.cookieKey]
}));

app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

// routes
mountRoutes(app);