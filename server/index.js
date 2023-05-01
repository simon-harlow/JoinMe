const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(cors());
app.use(express.static('public'))
app.use(express.json());

// helpful console output for each interaction, good for auditing purposes
app.use((req, res, next) => {
    console.log(`[${req.method}] Request for path "${req.path}" at ${new Date().toLocaleString('en-US')}`);
    next();
});

// Routes
const usersRoute = require('./routes/usersRoute');
const eventsRoute = require('./routes/eventsRoute');

app.use('/users', usersRoute);
app.use('/events', eventsRoute)

// Server Startup
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});