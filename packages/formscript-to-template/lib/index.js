const _ = require('lodash')
const widgetProcessors = require('./widgets')
const dottie = require('dottie')

module.exports.convert = function convert (formscript, options) {
  if (!options) {
    options = {}
  }

  const rootTag = dottie.get(options, 'template.rootTag') || ['<div>', '</div>']
  const tagPrefix = dottie.get(options, 'template.widgetTagPrefix') || 'app'
  let lineEnding
  let tab
  if (dottie.get(options, 'template.pretty')) {
    tab = ''
    lineEnding = ''
  } else {
    tab = '  '
    lineEnding = '\n'
  }
  let indent = tab
  let template = rootTag[0] + lineEnding
  const widgets = formscript.widgets

  widgets.forEach(
    function (widgetDefinition) {
      const widgetType = widgetDefinition.type
      const tagName = `${tagPrefix}-${_.kebabCase(widgetType)}`
      if (widgetType === 'endSet') {
        indent = indent.slice(2)
      }
      const widgetProcessor = widgetProcessors[widgetDefinition.type]
      template += `${indent}<${tagName}>`
      if (widgetProcessor.hasOwnProperty('titleMapProcessor')) {
        template += lineEnding
        indent += tab

        widgetDefinition.attributes.titleMap.forEach(
          function (titleMap) {
            const childTags = widgetProcessor.titleMapProcessor(widgetDefinition, titleMap, tagPrefix, options)
            childTags.forEach(
              function (childTag) {
                template += `${indent}${childTag}${lineEnding}`
              }
            )
          }
        )

        indent = indent.slice(2)
        template += indent
      }
      if (widgetProcessor.closingTag) {
        template += `</${tagName}>`
      }
      template += lineEnding
      if (widgetType === 'set') {
        indent += '  '
      }
    }
  )

  template += rootTag[1] + lineEnding

  return {
    template: template
  }
}
