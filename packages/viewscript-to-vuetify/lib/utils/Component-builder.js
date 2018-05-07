const _ = require('lodash')

class TagNode {
  constructor (name, providedOptions) {
    let options
    if (providedOptions === undefined) {
      options = {}
    } else {
      options = providedOptions
    }

    this.options = _.defaults(
      options,
      {
        includeClosingTag: true
      }
    )
    this.name = name
    this.tagContent = null
    this.attributes = []
    this.childTags = []
  }

  content (tagContent) {
    if (tagContent !== undefined) {
      this.tagContent = tagContent
    }
  }

  addAttribute (name, value) {
    if (value !== undefined) {
      if (value === null) {
        this.attributes.push(name)
      } else {
        this.attributes.push(`${name}="${value}"`)
      }
    }
  }

  bindToModel (widgetDefinition, modifier) {
    let attributeName = 'v-model'
    if (modifier) {
      attributeName += `.${modifier}`
    }
    this.addAttribute(attributeName, 'data.' + widgetDefinition.id)
  }

  addChildTag (tagName, options) {
    const tagNode = new TagNode(tagName, options)
    this.childTags.push(tagNode)
    return tagNode
  }
}

module.exports = class ComponentBuilder {
  constructor (widgetDefiniton, providedOptions) {
    this.rootTags = []
    if (widgetDefiniton) {
      this.showWhen = widgetDefiniton.showWhen
    }
  }

  addTag (tagName, options) {
    const tagNode = new TagNode(tagName, options)
    this.rootTags.push(tagNode)
    return tagNode
  }

  compile () {
    let template = ''

    if (this.showWhen) {
      template += `<template v-if="${this.showWhen}">`
    }

    function _processTagArray (rootTags) {
      rootTags.forEach(
        function (tag) {
          let line = ''
          if (tag.attributes.length === 0) {
            line += `<${tag.name}>`
          } else {
            line += `<${tag.name} ${tag.attributes.join(' ')}>`
          }
          if (tag.tagContent !== null) {
            line += tag.tagContent
          }
          template += line
          _processTagArray(tag.childTags)

          if (tag.options.includeClosingTag) {
            template += `</${tag.name}>`
          }
        }
      )
    }

    _processTagArray(this.rootTags)

    if (this.showWhen) {
      template += '</template>'
    }

    return template
  }
}
