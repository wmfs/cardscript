const builders = require('./builders')
const ONE_TAB = '  '

module.exports = function extractDefaults (viewscript, options) {
  let indent = '  '
  let vuetifyTemplate = '<v-form>\n'

  if (viewscript.widgets) {
    viewscript.widgets.forEach(widgetDefinition => {
      const widgetType = widgetDefinition.type
      const lines = builders[widgetType].conversionFunction(widgetDefinition, options)

      if (widgetType === 'endSet') {
        indent = indent.slice(ONE_TAB.length)
      }

      vuetifyTemplate += `${indent}${lines}\n`

      if (widgetType === 'set') {
        indent += ONE_TAB
      }
    })
  }
  vuetifyTemplate += '</v-form>'
  return {
    template: vuetifyTemplate
  }
}
