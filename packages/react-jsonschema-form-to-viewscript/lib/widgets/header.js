module.exports = class Header {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'header',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
