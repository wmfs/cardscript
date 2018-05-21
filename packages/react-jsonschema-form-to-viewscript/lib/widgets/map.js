module.exports = class Map {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'map',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
