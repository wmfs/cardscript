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
  }
}
