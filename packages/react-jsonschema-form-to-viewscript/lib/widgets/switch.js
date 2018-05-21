module.exports = class Switch {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'switch',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
