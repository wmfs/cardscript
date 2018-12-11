const builders = require('./builders')
const ONE_TAB = '  '
const INDENT = '  '

module.exports = function extractDefaults (cardscript, options) {
  let template = '<div>\n'
  let depth = 0

  function parseElement (element, idx) {
    let indent = INDENT
    for (let i = 0; i < depth; i++) {
      indent += ONE_TAB
    }

    if (builders[element.type]) {
      const lines = builders[element.type].conversionFunction(element, options, idx)
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

    if (element.type === 'TabSet') {
      depth++
      element.tabs.forEach(parseElement)
      depth--
      template += `${indent}</q-tabs>`
    }

    if (element.type === 'Tab') {
      depth++
      element.items.forEach(parseElement)
      depth--
      template += `${indent}</q-tab-pane>`
    }

    if (element.type === 'Collapsible') {
      depth++
      element.card.body.forEach(parseElement)
      depth--
      template += `</div></q-collapsible>`
    }

    if (element.type === 'CardView') {
      depth++
      element.card.body.forEach(parseElement)
      parseElement({ type: 'EndCardView' })
      depth--
    }

    if (element.type === 'ActionSet') {
      depth++
      element.actions.forEach(parseElement)
      depth--
      template += `</q-btn-group>`
    }
  }

  if (cardscript.body) {
    cardscript.body.forEach(parseElement)
  }

  if (cardscript.actions) {
    template += `<div class="q-mt-md">`
    cardscript.actions.forEach(parseElement)
    template += `</div>`
  }

  template += '</div>'
  return { template }
}
