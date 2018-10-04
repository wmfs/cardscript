const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

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
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const field = builder.addTag('q-field')
  field.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)

  const uploader = field.addChildTag('q-uploader')
  uploader.addAttribute('class', 'q-ma-xl')
  uploader.addAttribute('float-label', getAttribute('heading'))
  uploader.addAttribute('url', '""')

  return builder.compile()
}
