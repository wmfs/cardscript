module.exports = class Radio {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'radio',
      attributes: {
        heading: options.schema.title,
        titleMap: options.schema.enum.map((e, idx) => {
          return {value: e, title: options.schema.enumNames[idx]}
        }),
        mandatory: options.mandatory
      }
    }

    if (options.default) this.widget.attributes.default = options.default
  }
}
