export function templateCompiler (widget) {
  const attribs = []
  attribs.push(`v-model = "data.${widget.key}"`)
  attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)

  let template = `<app-radio ${attribs.join(' ')}>`

  widget.config.dataSchemaEntry.enum.forEach(
    function (value, idx) {
      template += `<input id="${widget.key}_${value}" type="radio" ref="input" v-model="data.${widget.key}" value="${value}" name="${widget.key}">`
      template += `<label for="${widget.key}_${value}">${widget.config.dataSchemaEntry.enumNames[idx]}</label><br>`
    }
  )

  template += `</app-radio>`
  return template
}

export function getWidgetDefaults (widget, defaults) {
  const definitionDefault = widget.config.dataSchemaEntry.default
  if (definitionDefault) {
    defaults[widget.key] = definitionDefault
  }
}
