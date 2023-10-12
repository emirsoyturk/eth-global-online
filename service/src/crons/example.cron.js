const { cronLogger } = require('../services/logger.service')

async function main() {

}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        cronLogger.error(``, {
            type: 'example',
            message: `${err}`,
        })
    })
