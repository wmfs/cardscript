module.exports = class Select {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'select',
      attributes: {
        heading: options.schema.title,
        titleMap: options.schema.enum.map((e, idx) => {
          return {value: e, title: options.schema.enumNames[idx]}
        }),
        mandatory: options.mandatory
      }
    }
    if (options.conditionalSchema.length > 0) this.widget.showWhen = options.conditionalSchema[0]
    if (options.schema.default) this.widget.attributes.default = options.schema.default
  }
}
