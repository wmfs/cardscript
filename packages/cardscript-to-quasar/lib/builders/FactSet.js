const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function (definition, options) {
  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(definition)
  const div = builder.addTag('div')
  definition.facts.forEach(({ title, value }) => {
    const fact = div.addChildTag('div')
    fact.content(`${title} ${value}`)
  })
  return builder.compile()
}
