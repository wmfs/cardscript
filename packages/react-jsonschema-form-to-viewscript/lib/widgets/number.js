module.exports = class Number {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'number',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
