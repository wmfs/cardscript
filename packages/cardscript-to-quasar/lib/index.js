const builders = require('./builders')
// const { inspect } = require('util')
const ONE_TAB = '  '
const INDENT = '  '

module.exports = function extractDefaults (cardscript, options) {
  let template = '<div>\n'
  let depth = 0

  function parseElement (element) {
    let indent = INDENT
    for (let i = 0; i < depth; i++) {
      indent += ONE_TAB
    }

    if (builders[element.type]) {
      const lines = builders[element.type].conversionFunction(element, options)
      template += `${indent}${lines}\n`
    } else {
      console.log(`Unknown type of builder: ${element.type}`)
    }

    if (element.type === 'Container') {
      depth++
      element.items.forEach(parseElement)
      depth--
      template += `${indent}</q-card-main></q-card>`
    }

    if (element.type === 'Column') {
      depth++
      element.items.forEach(parseElement)
      depth--
      template += `${indent}</div>`
    }

    if (element.type === 'ColumnSet') {
      depth++
      element.columns.forEach(parseElement)
      depth--
      template += `${indent}</div>`
    }

    if (element.type === 'Collapsible') {
      depth++
      element.card.body.forEach(parseElement)
      depth--
      template += `</div></q-collapsible>`
    }
  }

  if (cardscript.body) {
    cardscript.body.forEach(parseElement)
  }

  if (cardscript.actions) {
    template += `<div>`
    cardscript.actions.forEach(parseElement)
    template += `</div>`
  }

  /*
  if (cardscript.actions) {
    cardscript.actions.forEach(actionDefinition => {
      const label = `label="${actionDefinition.title}"`
      const colour = actionDefinition.style ? `color="${actionDefinition.style}"` : `color="primary"`
      let click = `@click="action('${actionDefinition.type}', ${inspect({config: actionDefinition.config})})"`

      if (actionDefinition.type === 'Submit') {
        click = `@click="action('${actionDefinition.type}', {data, config: ${inspect(actionDefinition.config)}})"`
      }

      const btn = `<q-btn ${label} ${colour} ${click} class="q-mt-sm" />`
      template += `${indent}${btn}\n`
    })
  }
  */

  template += '</div>'
  return { template }
}
