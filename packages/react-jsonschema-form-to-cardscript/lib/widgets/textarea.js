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
    if (options.conditionalSchema.length > 0) this.widget.showWhen = options.conditionalSchema[0]
  }
}
