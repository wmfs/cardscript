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
    if (options.conditionalSchema.length > 0) this.widget.showWhen = options.conditionalSchema[0]
    if (options.schema.hasOwnProperty('default')) this.widget.attributes.default = options.schema.default
  }
}
