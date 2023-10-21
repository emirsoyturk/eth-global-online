const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const dotenv = require('dotenv')
const { generalLogger } = require('./src/services/logger.service')

const example = require('./src/routes/example.route')
const sentence = require('./src/routes/sentence.route')
const noir = require('./src/routes/noir.route')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Error handler
const errorHandler = (error, request, response, next) => {
    if (!error) {
        response.status(404).send('Page not found')
        return
    }

    console.log(error)
    generalLogger.error(`Error occurred during the request.`, {
        errorMessage: error.message,
        method: request.method,
        url: request.url,
    })

    const status = error.status || 400
    response.status(status).send("Internal Server Error")
}

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())

// Routes
app.get('/', (req, res) => res.json({ message: 'ok' }))
app.use('/example', example)
app.use('/sentence', sentence)
app.use("/noir", noir)

// Error handler middleware
app.use(errorHandler)

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`))
