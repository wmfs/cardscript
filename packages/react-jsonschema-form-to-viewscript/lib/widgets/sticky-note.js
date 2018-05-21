module.exports = class StickyNote {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'stickyNote',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
