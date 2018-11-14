const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function richtextConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory

  // const getAttribute = GetAttribute(widgetDefinition)
  /*
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Richtext widget!')
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const getAttribute = GetAttribute(widgetDefinition)

  const caption = builder.addTag('p')
  caption.addAttribute('class', 'q-mx-xl q-mt-xl caption')
  caption.content(getAttribute('heading'))

  const editor = builder.addTag('q-editor')
  editor.bindToModel(widgetDefinition)
  editor.addAttribute('class', 'q-mx-xl')
  return builder.compile()
}
