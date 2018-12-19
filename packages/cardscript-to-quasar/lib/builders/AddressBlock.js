const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    // multiline,
    lineDelimited,
    title,
    dataPath
  } = definition
  const builder = new ComponentBuilder(definition)

  const div = builder.addTag('div')

  const titleText = div.addChildTag('p')
  titleText.content(title || 'Address')

  const notFoundText = div.addChildTag('p')
  notFoundText.content('Address not found.')
  notFoundText.addAttribute('v-if', `!data.${dataPath}`)

  const lines = div.addChildTag('div')
  lines.addAttribute('v-if', `data.${dataPath}`)
  const line = lines.addChildTag('p')
  line.addAttribute('v-for', `(line, $idx) in data.${dataPath}.split('${lineDelimited || ','}')`)
  line.addAttribute(':key', '$idx')
  line.content(`{{line}}`)

  return builder.compile()
}
