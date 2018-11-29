const _ = require('lodash')
const widgetProcessors = require('./widgets')
const dottie = require('dottie')
const replacementTagNames = {}
const getModelBindingTagFunction = require('./utils/get-model-binding-tag-function')

module.exports.convert = function convert (cardscript, options) {
  if (!options) {
    options = {}
  }

  const rootTag = dottie.get(options, 'template.rootTag') || ['<form>', '</form>']
  const tagPrefix = dottie.get(options, 'template.widgetTagPrefix') || 'app'
  replacementTagNames.set = dottie.get(options, 'template.setReplacementTag') || 'div'
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
  const widgets = cardscript.widgets

  let bindingTag
  let bindingTemplate
  if (options.modelBindingAttributeTemplate) {
    bindingTag = options.modelBindingAttributeTemplate[0]
    bindingTemplate = options.modelBindingAttributeTemplate[1]
  }
  const makeModelBindingTag = getModelBindingTagFunction(bindingTag, bindingTemplate)

  const showWhenTag = options.showWhenTag || 'v-if'

  options.makeModelBindingTag = makeModelBindingTag
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
        if (widgetDefinition.id) {
          let idName
          if (widgetDefinition.type === 'set') {
            idName = 'id'
          } else {
            idName = 'widgetId'
          }
          attributes.push(
            {
              propName: idName,
              propString: widgetDefinition.id
            }
          )
        }
        if (widgetProcessor.bindToDataModel && widgetDefinition.id) {
          attributes.push(makeModelBindingTag(widgetDefinition.id))
        }

        if (widgetDefinition.showWhen) {
          attributes.push(
            {
              propName: showWhenTag,
              propString: widgetDefinition.showWhen
            }
          )
        }

        if (widgetDefinition.hasOwnProperty('attributes')) {
          _.forEach(
            widgetDefinition.attributes,
            function (value, key) {
              if (key !== 'titleMap' && key !== 'tocTitle') {
                attributes.push(
                  {
                    propName: _.kebabCase(key),
                    propString: value
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
