const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mountRoutes = require('./routes');
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
};

app.use(express.json());
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

// routes
mountRoutes(app);