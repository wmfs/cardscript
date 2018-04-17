const _ = require('lodash')
const escape = require('escape-html')
const widgetProcessors = require('./widgets')
const dottie = require('dottie')
const replacementTagNames = {}

module.exports.convert = function convert (formscript, options) {
  if (!options) {
    options = {}
  }

  const rootTag = dottie.get(options, 'template.rootTag') || ['<div>', '</div>']
  const tagPrefix = dottie.get(options, 'template.widgetTagPrefix') || 'app'
  replacementTagNames.set = dottie.get(options, 'template.setReplacementTag') || 'template'
  replacementTagNames.endSet = dottie.get(options, 'template.setReplacementTag') || replacementTagNames.set

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
      let tagName
      if (replacementTagNames.hasOwnProperty(widgetType)) {
        tagName = replacementTagNames[widgetType]
      } else {
        tagName = `${tagPrefix}-${_.kebabCase(widgetType)}`
      }
      if (widgetType === 'endSet') {
        indent = indent.slice(2)
      }

      const widgetProcessor = widgetProcessors[widgetDefinition.type]
      if (widgetProcessor.openingTag) {
        // Process attributes
        const attributes = []

        if (widgetDefinition.showWhen) {
          attributes.push(
            {
              propName: 'X',
              propString: 'Y'
            }
          )
        }

        if (widgetDefinition.hasOwnProperty('attributes')) {
          _.forEach(
            widgetDefinition.attributes,
            function (value, key) {
              if (key !== 'titleMap') {
                attributes.push(
                  {
                    propName: _.kebabCase(key),
                    propString: escape(value)
                  }
                )
              }
            }
          )
        }

        if (attributes.length === 0) {
          template += `${indent}<${tagName}>`
        } else {
          template += `${indent}<${tagName} ${attributes.map(a => `${a.propName}="${a.propString}"`).join(' ')}>`
        }

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
      } else {
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
