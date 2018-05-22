module.exports = class CheckboxList {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'checkboxList',
      attributes: {
        heading: options.schema.title,
        titleMap: options.schema.items.map(i => {
          return {value: i.key, title: i.title}
        }),
        mandatory: options.mandatory
      }
    }
    if (options.conditionalSchema.length > 0) this.widget.showWhen = options.conditionalSchema[0]
  }
}
