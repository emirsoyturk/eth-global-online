const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const dotenv = require('dotenv')
const { generalLogger } = require('./src/services/logger.service')

const example = require('./src/routes/example.route')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Error handler
const errorHandler = (error, request, response, next) => {
    if (!error) {
        response.status(404).send('Page not found')
        return
    }

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
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: 'cross-origin',
        },
    })
)
app.use(cors())
app.use(compression())
app.use(helmet())

// Routes
app.get('/', (req, res) => res.json({ message: 'ok' }))
app.use('/example', example)

// Error handler middleware
app.use(errorHandler)

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`))