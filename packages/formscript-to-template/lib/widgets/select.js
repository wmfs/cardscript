module.exports = {
  showWhen: true,
  bindToDataModel: true,
  openingTag: true,
  closingTag: true,
  titleMapProcessor: function (widgetDefinition, titleMap, tagPrefix, options) {
    return [
      `<option value="${titleMap.value}">${titleMap.title}</option>`
    ]
  }
}

// export function templateCompiler (widget) {
//   const attribs = []
//   attribs.push(`v-model = "data.${widget.key}"`)
//   attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)
//
//   const placeholder = widget.config.uiWidgetEntry.ui_placeholder
//   if (placeholder) {
//     attribs.push(`placeholder="${widget.config.uiWidgetEntry.ui_placeholder}"`)
//   }
//
//   let template = `<app-select ${attribs.join(' ')}>`
//
//   widget.config.dataSchemaEntry.enum.forEach(
//     function (value, idx) {
//       template += `<option value="${value}">${widget.config.dataSchemaEntry.enumNames[idx]}</option>`
//     }
//   )
//
//   template += `</app-select>`
//   return template
// }
//
// export function getWidgetDefaults (widget, defaults) {
//   const definitionDefault = widget.config.dataSchemaEntry.default
//   if (definitionDefault) {
//     defaults[widget.key] = definitionDefault
//   }
// }
