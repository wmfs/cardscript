const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const { id } = definition

  const builder = new ComponentBuilder(definition)

  const div = builder.addTag('div')

  const searchFld = div.addChildTag('q-input')
  searchFld.addAttribute('float-label', 'Enter the Address')
  searchFld.bindToModel({ id: `${id}SearchFld` })

  const searchBtn = div.addChildTag('q-btn')
  searchBtn.addAttribute('class', 'q-mt-md')
  searchBtn.addAttribute('label', 'Find Address')
  searchBtn.addAttribute('color', 'primary')
  searchBtn.addAttribute('@click', `action('InputAddress', {})`)

  // Show when results have been found
  // const selectTxt = div.addChildTag('div')
  // selectTxt.content('Select an address')
  // selectTxt.addAttribute('class', 'q-mt-lg')

  // const selectFld = div.addChildTag('div')
  // selectFld.bindToModel(definition)
  // selectFld.addAttribute('class', 'q-mt-md')
  // selectFld.addAttribute(':options', ``) // `${id}SearchResults`

  // else 'No address found'

  // I can't find my address

  return builder.compile()
}
