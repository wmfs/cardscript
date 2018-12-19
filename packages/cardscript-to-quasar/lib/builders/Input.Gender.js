const ComponentBuilder = require('./../utils/Component-builder')
const { inspect } = require('util')

module.exports = function (definition, options) {
  const {
    term,
    preferNotToSay,
    preferToSelfDescribe,
    includeTransgender
  } = definition

  const builder = new ComponentBuilder(definition)

  const field = builder.addTag('q-field')
  field.addAttribute('label', term === 'sex' ? 'Sex' : 'Gender')

  const optionGroup = field.addChildTag('q-option-group')
  optionGroup.addAttribute('type', 'radio')
  optionGroup.bindToModel(definition)

  const opts = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
  ]

  if (preferNotToSay) opts.push({ label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' })
  if (preferToSelfDescribe) opts.push({ label: 'Prefer not to self describe', value: 'PREFER_NOT_TO_SELF_DESCRIBE' })
  if (includeTransgender) opts.push({ label: 'Transgender', value: 'TRANSGENDER' })

  optionGroup.addAttribute(':options', inspect(opts))

  return builder.compile()
}
