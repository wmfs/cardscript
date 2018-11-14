
module.exports = function (bindingTagName, bindingTemplate) {
  const WIDGET_ID = '$$WIDGET_ID$$'
  bindingTagName = bindingTagName || 'v-model'
  bindingTemplate = bindingTemplate || 'data.' + WIDGET_ID
  return function makeModelBindingTag (widgetId) {
    return {
      propName: bindingTagName,
      propString: bindingTemplate.split(WIDGET_ID).join(widgetId)
    }
  }
}
