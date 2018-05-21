module.exports = class Richtext {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'richtext',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
