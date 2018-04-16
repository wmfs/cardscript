export function templateCompiler (widget) {
  const attribs = []
  attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)
  attribs.push(`description="${widget.config.dataSchemaEntry.description}"`)

  let template = `<app-questionnaire ${attribs.join(' ')}>`
  widget.config.dataSchemaEntry.items.forEach(
    function (item) {
      // {"label":"0","value":0,"icon":"","hint":"No pain"}

      const optionAttribs = []
      optionAttribs.push(`v-model = "data.${widget.key}"`)
      optionAttribs.push(`widgetKey="${widget.key}"`)
      optionAttribs.push(`label="${item.label}"`)
      optionAttribs.push(`description="${item.hint}"`)
      optionAttribs.push(`icon="${item.icon}"`)
      template += `<app-questionnaire-option ${optionAttribs.join(' ')}></app-questionnaire-option>`
    }
  )
  template += `</app-questionnaire>`
  return template
}

export function getWidgetDefaults (widget, defaults) {
  const definitionDefault = widget.config.dataSchemaEntry.default
  if (definitionDefault) {
    defaults[widget.key] = definitionDefault
  }
}
