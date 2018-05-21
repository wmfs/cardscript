module.exports = class ApiLookup {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'apiLookup',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
