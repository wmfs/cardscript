module.exports = class ExpandableNotice {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'expandableNotice',
      attributes: {
        heading: options.schema.title,
        content: options.schema.text
      }
    }
  }
}
