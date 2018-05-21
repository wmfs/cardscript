module.exports = class Questionnaire {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'questionnaire',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory,
        titleMap: options.schema.items.map(i => {
          return {
            value: i.value,
            title: i.label,
            desc: i.hint
          }
        }),
        numericValue: options.schema.type === 'number' || options.schema.type === 'integer'
      }
    }
    if (options.default) this.widget.attributes.default = options.default
  }
}
