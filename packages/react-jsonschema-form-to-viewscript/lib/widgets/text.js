module.exports = class Text {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'text',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
