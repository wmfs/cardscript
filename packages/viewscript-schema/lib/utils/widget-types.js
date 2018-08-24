const _ = require('lodash')
const schema = require('../schema')

module.exports = _.keys(schema.definitions.widgets)
