module.exports = {
  showWhen: true,
  bindToDataModel: false,
  openingTag: true,
  closingTag: true,
  titleMapProcessor: function (widgetDefinition, titleMap, tagPrefix, options) {
    const optionAttribs = []
    const bindingProp = options.makeModelBindingTag(widgetDefinition.id)
    optionAttribs.push(`${bindingProp.propName}="${bindingProp.propString}"`)
    optionAttribs.push(`widgetId="${widgetDefinition.id}"`)
    optionAttribs.push(`title="${titleMap.title}"`)
    optionAttribs.push(`desc="${titleMap.desc}"`)
    optionAttribs.push(`responseValue="${titleMap.value}"`)
    return [
      `<${tagPrefix}-questionnaire-option ${optionAttribs.join(' ')}></${tagPrefix}-questionnaire-option>`
    ]
  }
}

// module.exports.compiler = function templateCompiler (widget) {
//   const attribs = []
//   attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)
//   attribs.push(`description="${widget.config.dataSchemaEntry.description}"`)
//
//   let template = `<app-questionnaire ${attribs.join(' ')}>`
//   widget.config.dataSchemaEntry.items.forEach(
//     function (item) {
//       // {"label":"0","value":0,"icon":"","hint":"No pain"}
//
//       const optionAttribs = []
//       optionAttribs.push(`v-model = "data.${widget.key}"`)
//       optionAttribs.push(`widgetKey="${widget.key}"`)
//       optionAttribs.push(`label="${item.label}"`)
//       optionAttribs.push(`description="${item.hint}"`)
//       optionAttribs.push(`icon="${item.icon}"`)
//       template += `<app-questionnaire-option ${optionAttribs.join(' ')}></app-questionnaire-option>`
//     }
//   )
//   template += `</app-questionnaire>`
//   return template
// }
//
// module.exports.getWidgetDefaults = function (widget, defaults) {
//   const definitionDefault = widget.config.dataSchemaEntry.default
//   if (definitionDefault) {
//     defaults[widget.key] = definitionDefault
//   }
// }
