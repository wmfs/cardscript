module.exports = class CheckboxList {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'checkboxList',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
