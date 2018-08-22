module.exports = class Address {
  constructor (options) {
    this.widget = {
      id: '',
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
