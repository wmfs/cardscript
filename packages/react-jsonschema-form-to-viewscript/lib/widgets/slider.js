module.exports = class Slider {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'slider',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
    if (options.conditionalSchema.length > 0) this.widget.showWhen = options.conditionalSchema[0]
  }
}
