export function templateCompiler (widget) {
  const attribs = []
  attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)

  let template = `<app-checkbox-tree ${attribs.join(' ')}>`
  widget.config.dataSchemaEntry.items.forEach(
    function (item) {
      const inputTemplate = `<input id="${widget.key}_${item.key}" type="checkbox" v-model="data.${widget.key}" value="${item.key}">`
      template += inputTemplate
      template += `<label for="${widget.key}_${item.key}">${item.title}</label><br>`
    }
  )
  template += `</app-checkbox-tree>`
  return template
}

export function getWidgetDefaults (widget, defaults) {
  defaults[widget.key] = []
}
