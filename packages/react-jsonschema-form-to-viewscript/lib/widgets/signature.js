module.exports = class Signature {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'signature',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
