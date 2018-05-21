module.exports = class Date {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'date',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
