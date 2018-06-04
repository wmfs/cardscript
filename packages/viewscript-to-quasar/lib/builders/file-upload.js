const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function fileUploadConverter (widgetDefinition, options) {
  // captionPath
  // enabled
  // formatRestriction
  // heading
  // help
  // mandatory
  // maxFileSize
  // maxNumberOfFiles
  // minNumberOfFiles

  /*
  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: file-upload widget!')
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: file-upload widget!')
  return builder.compile()
}
