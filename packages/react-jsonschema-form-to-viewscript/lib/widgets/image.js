module.exports = class Image {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'image',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
