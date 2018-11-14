module.exports = {
  showWhen: true,
  bindToDataModel: true,
  openingTag: true,
  closingTag: true,
  titleMapProcessor: function (widgetDefinition, titleMap, tagPrefix, options) {
    const id = `${widgetDefinition.id}_${titleMap.value}`
    return [
      `<input id="${id}" type="checkbox" v-model="data.${widgetDefinition.id}" value="${titleMap.value}">`,
      `<label for="${id}">${titleMap.title}</label><br>`
    ]
  }
}

// module.exports.compiler = function templateCompiler (widget) {
//   const attribs = []
//   attribs.push(`label="${widget.config.dataSchemaEntry.title}"`)
//
//   let template = `<app-checkbox-tree ${attribs.join(' ')}>`
//   widget.config.dataSchemaEntry.items.forEach(
//     function (item) {
//       const inputTemplate = `<input id="${widget.key}_${item.key}" type="checkbox" v-model="data.${widget.key}" value="${item.key}">`
//       template += inputTemplate
//       template += `<label for="${widget.key}_${item.key}">${item.title}</label><br>`
//     }
//   )
//   template += `</app-checkbox-tree>`
//   return template
// }
//
// module.exports.getWidgetDefaults = function (widget, defaults) {
//   defaults[widget.key] = []
// }
