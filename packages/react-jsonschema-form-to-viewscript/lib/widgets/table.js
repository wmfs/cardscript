const _ = require('lodash')

module.exports = class Address {
  constructor (options) {
    this.widget = {
      id: _.camelCase(options.config.header),
      type: 'table',
      attributes: {
        heading: options.config.header,
        dataPath: options.config.dataPath,
        columns: options.config.columns.map(col => {
          return {
            title: col.header,
            dataPath: col.dataPath
          }
        })
      }
    }
  }
}
