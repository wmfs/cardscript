module.exports = function (viewscript, validators) {
  const validations = {}

  if (viewscript.widgets && viewscript.widgets.length > 0) {
    for (const widget of viewscript.widgets) {
      const output = {}
      if (widget.id && widget.attributes) {
        // todo: handle requiredIf by if the required field/set appears in a show when
        if (widget.attributes.mandatory === true) output.required = validators.required

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
