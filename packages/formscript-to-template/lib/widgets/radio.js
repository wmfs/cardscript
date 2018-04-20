module.exports = {
  showWhen: true,
  bindToDataModel: false,
  openingTag: true,
  closingTag: true,
  titleMapProcessor: function (widgetDefinition, titleMap, tagPrefix, options) {
    const id = `${widgetDefinition.id}_${titleMap.value}`
    return [
      `<input id="${id}" type="radio" ref="input" v-model="data.${widgetDefinition.id}" value="${titleMap.value}" name="${widgetDefinition.id}">`,
      `<label for="${id}">${titleMap.title}</label><br>`
    ]
  }
}

// module.exports.compiler = function templateCompiler (widget) {
//   const attribs = []
//   attribs.push(`v-model = "data.${widget.key}"`)
//   attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)
//
//   let template = `<app-radio ${attribs.join(' ')}>`
//
//   widget.config.dataSchemaEntry.enum.forEach(
//     function (value, idx) {
//       template += `<input id="${widget.key}_${value}" type="radio" ref="input" v-model="data.${widget.key}" value="${value}" name="${widget.key}">`
//       template += `<label for="${widget.key}_${value}">${widget.config.dataSchemaEntry.enumNames[idx]}</label><br>`
//     }
//   )
//
//   template += `</app-radio>`
//   return template
// }
//
// module.exports.getWidgetDefaults = function (widget, defaults) {
//   const definitionDefault = widget.config.dataSchemaEntry.default
//   if (definitionDefault) {
//     defaults[widget.key] = definitionDefault
//   }
// }
