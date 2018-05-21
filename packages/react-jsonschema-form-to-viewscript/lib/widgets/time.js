module.exports = class Time {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'time',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
