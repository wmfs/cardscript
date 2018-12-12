const dottie = require('dottie')
const builders = require('./builders')
const ONE_TAB = '  '
const INDENT = '  '
const CONTAINERS = {
  Container: {
    endTemplate: '</q-card-main></q-card>',
    arrayPath: 'items'
  },
  Column: {
    endTemplate: '</div>',
    arrayPath: 'items'
  },
  ColumnSet: {
    endTemplate: '</div>',
    arrayPath: 'columns'
  },
  TabSet: {
    endTemplate: '</q-tabs>',
    arrayPath: 'tabs'
  },
  Tab: {
    endTemplate: '</q-tab-pane>',
    arrayPath: 'items'
  },
  Collapsible: {
    endTemplate: '</div></q-collapsible>',
    arrayPath: 'card.body'
  },
  ActionSet: {
    endTemplate: '</q-btn-group>',
    arrayPath: 'actions'
  },
  ImageSet: {
    endTemplate: '</div>',
    arrayPath: 'images'
  }
}

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

    if (Object.keys(CONTAINERS).includes(element.type)) {
      depth++
      dottie.get(element, CONTAINERS[element.type].arrayPath).forEach(parseElement)
      template += `${indent}${CONTAINERS[element.type].endTemplate}`
      depth--
    }

    if (element.type === 'CardView') {
      depth++
      element.card.body.forEach(parseElement)
      parseElement({ type: 'EndCardView', editable: element.editable || false })
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
