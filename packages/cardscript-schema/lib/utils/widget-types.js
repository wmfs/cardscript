const _ = require('lodash')
const schema = require('../schema.json')

module.exports = _.keys(schema.definitions.widgets)
