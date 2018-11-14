const evaluate = require('./evaluate')

// const evaluate = require('static-eval')
// const parse = require('esprima').parse

module.exports = function (cardscript, validators) {
  const validations = {}

  if (cardscript.widgets && cardscript.widgets.length > 0) {
    for (const widget of cardscript.widgets) {
      const output = {}
      if (widget.id && widget.attributes) {
        if (widget.attributes.mandatory === true) {
          if (widget.showWhen) {
            output.required = validators.requiredIf(data => {
              // evaluate widget.showWhen on data and return
              // not sure if this is right....
              return evaluate(widget.showWhen, data)
            })
          } else {
            output.required = validators.required
          }
        }

        if (widget.attributes.minimum && widget.attributes.maximum) output.between = validators.between(widget.attributes.minimum, widget.attributes.maximum)
        if (widget.attributes.minimum && !widget.attributes.maximum) output.minValue = validators.minValue(widget.attributes.minimum)
        if (!widget.attributes.minimum && widget.attributes.maximum) output.maxValue = validators.maxValue(widget.attributes.maximum)

        if (widget.attributes.minCharacters) output.minLength = validators.minLength(widget.attributes.minCharacters)
        if (widget.attributes.maxCharacters) output.maxLength = validators.maxLength(widget.attributes.maxCharacters)

        if (widget.attributes.minLimit) output.minLength = validators.minLength(widget.attributes.minLimit)
        if (widget.attributes.maxLimit) output.maxLength = validators.maxLength(widget.attributes.maxLimit)
      }
      if (Object.keys(output).length > 0) validations[widget.id] = output
    }
  }

  return validations
}
