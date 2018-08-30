const builders = require('./builders')
const ONE_TAB = '  '

module.exports = function extractDefaults (viewscript, options) {
  let indent = '  '
  let quasarTemplate = '<div>\n'

  if (viewscript.widgets) {
    viewscript.widgets.forEach(widgetDefinition => {
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

  if (viewscript.actions) {
    viewscript.actions.forEach(actionDefinition => {
      const label = `label="${actionDefinition.title}"`
      const colour = actionDefinition.style ? `color="${actionDefinition.style}"` : `color="primary"`
      let click = ``

      switch (actionDefinition.type) {
        case 'OpenURL':
          click = `@click="openURL('${actionDefinition.config.url}')"`
          break
        case 'Submit':
          click = `@click="submit(data)"`
          break
        case 'ShowView':
          click = `@click="showView"`
          break
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
