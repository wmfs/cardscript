module.exports = class Address {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'address',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
