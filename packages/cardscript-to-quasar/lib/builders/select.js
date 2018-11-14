const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function selectConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // numericValue
  // titleMap

  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const select = builder.addTag('q-select')
  select.addAttribute('filter', null)
  select.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)
  // select.addAttribute(':dark', 'dark')
  select.addAttribute('stack-label', getAttribute('heading'))
  select.addAttribute('class', 'q-ma-xl')
  select.addAttribute(':options', `lists.${widgetDefinition.id}`)
  select.bindToModel(widgetDefinition)
  return builder.compile()

/*
<q-select
  filter
  v-model="select"
:options="options"
    />
*/

  // const builder = new ComponentBuilder(widgetDefinition)
  // const pre = builder.addTag('pre')
  // pre.content('// TODO: Select widget!')
}
