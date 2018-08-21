const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

// default
// desc
// enabled
// heading
// help
// mandatory
// maxCharacters
// minCharacters
// placeholder

module.exports = function expandableNoticeConverter (widgetDefinition, options) {
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Expandable Notice!')
  return builder.compile()
}
