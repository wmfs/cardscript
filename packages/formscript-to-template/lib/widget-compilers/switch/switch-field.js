export function templateCompiler (widget) {
  const attribs = []
  attribs.push(`v-model = "data.${widget.key}"`)
  attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)
  return `<app-switch ${attribs.join(' ')}></app-switch>`
}

export function getWidgetDefaults (widget, defaults) {
  defaults[widget.key] = false
}
