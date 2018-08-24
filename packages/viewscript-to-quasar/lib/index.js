const builders = require('./builders')
const ONE_TAB = '  '

export default function extractDefaults (viewscript, options) {
  let indent = '  '
  let quasarTemplate = '<div>\n'

  if (viewscript.widgets) {
    viewscript.widgets.forEach(
      function (widgetDefinition) {
        const widgetType = widgetDefinition.type
        const lines = builders[widgetType].conversionFunction(widgetDefinition, options)

        if (widgetType === 'endSet') {
          indent = indent.slice(ONE_TAB.length)
        }

        quasarTemplate += `${indent}${lines}\n`
        if (widgetType === 'set') {
          indent += ONE_TAB
        }
      }
    )
  }
  quasarTemplate += '</div>'
  return {
    template: quasarTemplate
  }
}
