require('dotenv').config()

const express = require('express')
const mongooose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Express app
const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongooose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listent for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

