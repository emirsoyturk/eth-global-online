const example = require('../services/example.service')
const { handleAsync } = require('../services/error.service')
const { generalLogger } = require('../services/logger.service')

async function get(req, res) {
    let { sample } = req.query

    const exampleInfo = await example.getExampleInfo()

    res.json(exampleInfo)
}

module.exports = {
    get: handleAsync(get),
}
