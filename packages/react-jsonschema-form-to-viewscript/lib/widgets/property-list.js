const _ = require('lodash')

module.exports = class PropertyList {
  constructor (options) {
    this.widget = {
      id: _.camelCase(options.config.header),
      type: 'propertyList',
      attributes: {
        heading: options.config.header,
        properties: options.config.properties.map(prop => {
          return {
            header: prop.prompt,
            dataPath: prop.dataPath
          }
        })
      }
    }
  }
}
