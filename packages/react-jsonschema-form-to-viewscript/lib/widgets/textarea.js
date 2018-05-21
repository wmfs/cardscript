module.exports = class Textarea {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'textarea',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
