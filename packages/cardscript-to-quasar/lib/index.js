const builders = require('./builders')
const {inspect} = require('util')
const ONE_TAB = '  '

module.exports = function extractDefaults (cardscript, options) {
  let indent = '  '
  let quasarTemplate = '<div>\n'

  if (cardscript.widgets) {
    cardscript.widgets.forEach(widgetDefinition => {
      const widgetType = widgetDefinition.type
      const lines = builders[widgetType].conversionFunction(widgetDefinition, options)

      if (widgetType === 'endSet') {
        indent = indent.slice(ONE_TAB.length)
      }

      quasarTemplate += `${indent}${lines}\n`
      if (widgetType === 'set') {
        indent += ONE_TAB
      }
    })
  }

  if (cardscript.actions) {
    cardscript.actions.forEach(actionDefinition => {
      const label = `label="${actionDefinition.title}"`
      const colour = actionDefinition.style ? `color="${actionDefinition.style}"` : `color="primary"`
      let click = `@click="action('${actionDefinition.type}', ${inspect({config: actionDefinition.config})})"`

      if (actionDefinition.type === 'Submit') {
        click = `@click="action('${actionDefinition.type}', {data, config: ${inspect(actionDefinition.config)}})"`
      }

      const btn = `<q-btn ${label} ${colour} ${click} class="q-mt-sm" />`
      quasarTemplate += `${indent}${btn}\n`
    })
  }

  quasarTemplate += '</div>'
  return {
    template: quasarTemplate
  }
}
