export function templateCompiler (widget) {
  const attribs = []
  attribs.push(`v-model = "data.${widget.key}"`)
  attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)

  const placeholder = widget.config.uiWidgetEntry.ui_placeholder
  if (placeholder) {
    attribs.push(`placeholder="${widget.config.uiWidgetEntry.ui_placeholder}"`)
  }

  return `<app-rich-text-area ${attribs.join(' ')}></app-rich-text-area>`
}
