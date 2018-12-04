const { keys } = require('lodash')
const schema = require('../schema.json')

module.exports = keys(schema.definitions.widgets)
