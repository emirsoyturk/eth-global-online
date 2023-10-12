const { createLogger, transports } = require('winston')
const dotenv = require('dotenv')
dotenv.config()

const developmentLogger = createLogger({
    exceptionHandlers: [
        new transports.Console(),
        new transports.File({ filename: 'logs/exceptions.log' }),
    ],
    rejectionHandlers: [
        new transports.Console(),
        new transports.File({ filename: 'logs/rejections.log' }),
    ],
})

const generalLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/general.log' }),
    ],
})

const cronLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/cron.log' }),
    ],
})

module.exports = {
    developmentLogger: developmentLogger,
    generalLogger: generalLogger,
    cronLogger: cronLogger
}
