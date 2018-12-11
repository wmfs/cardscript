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
      template += `${indent}</q-card-main></q-card>`
      depth--
    }

    if (element.type === 'Column') {
      depth++
      element.items.forEach(parseElement)
      template += `${indent}</div>`
      depth--
    }

    if (element.type === 'ColumnSet') {
      depth++
      element.columns.forEach(parseElement)
      template += `${indent}</div>`
      depth--
    }

    if (element.type === 'TabSet') {
      depth++
      element.tabs.forEach(parseElement)
      template += `${indent}</q-tabs>`
      depth--
    }

    if (element.type === 'Tab') {
      depth++
      element.items.forEach(parseElement)
      template += `${indent}</q-tab-pane>`
      depth--
    }

    if (element.type === 'Collapsible') {
      depth++
      element.card.body.forEach(parseElement)
      template += `</div></q-collapsible>`
      depth--
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
      template += `</q-btn-group>`
      depth--
    }

    if (element.type === 'ImageSet') {
      depth++
      element.images.forEach(parseElement)
      template += `</div>`
      depth--
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
