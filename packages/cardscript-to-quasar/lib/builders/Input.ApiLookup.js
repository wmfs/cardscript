const ComponentBuilder = require('./../utils/Component-builder')
const { inspect } = require('util')

module.exports = function (definition, options) {
  const { id } = definition
  const builder = new ComponentBuilder(definition)

  const div = builder.addTag('div')

  const searchFld = div.addChildTag('q-input')
  searchFld.addAttribute('float-label', 'Lookup')
  searchFld.bindToModel({ id: `${id}SearchFld` })

  const searchBtn = div.addChildTag('q-btn')
  searchBtn.addAttribute('class', 'q-mt-md')
  searchBtn.addAttribute('label', 'Lookup')
  searchBtn.addAttribute('color', 'primary')
  searchBtn.addAttribute('@click', `action('InputApiLookup', ${inspect({ dataPath: `${div.getDataPath()}`, id })})`)

  return builder.compile()
}
