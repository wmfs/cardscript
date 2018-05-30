const _ = require('lodash')

module.exports = class Map {
  constructor (options, uiType) {
    this.widget = uiType === 'form'
      ? {
        id: options.id,
        type: 'map',
        attributes: {
          heading: options.schema.title,
          mandatory: options.mandatory
        },
        showWhen: options.conditionalSchema.length > 0 && options.conditionalSchema[0]
      }
      : {
        id: _.camelCase(options.config.header),
        type: 'map',
        attributes: {
          heading: options.config.header
        }
      }
  }
}
