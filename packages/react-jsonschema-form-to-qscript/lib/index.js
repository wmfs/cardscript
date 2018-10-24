const evaluate = require('static-eval')
const { parse } = require('esprima')

const widgets = require('./widgets')

const WIDGET_MAP = {
  propertylist: 'PropertyList',
  maplist: 'Map',
  textField: 'Text',
  selectField: 'Select',
  switchField: 'Switch',
  radioField: 'Radio',
  sliderField: 'Slider',
  noticeField: 'StickyNote',
  checkField: 'CheckboxList',
  dateField: 'Date',
  timeField: 'Time',
  mapField: 'Map',
  fileUploader: 'FileUpload',
  questionnaire: 'Questionnaire',
  richTextArea: 'Richtext',
  numberField: 'Number',
  addressField: 'Address',
  expandableNoticeField: 'ExpandableNotice',
  buttonlist: 'ButtonList',
  tabularlist: 'Table'
}

// todo: unimplemented widgets
// markup
// summary
// taglist
// unknownField
// galleryField
// listField
// titleField
// annotationField
// repeatextFld
// diarysummary
// findField
// bookingField

module.exports = function reactJsonSchemaFormToQscript (view, uiType, data) {
  switch (uiType) {
    case 'board':
      return convertBoard(view, data)
    case 'form':
      return convertForm(view, getPropertyKeyMap(view))
  }
}

function getPropertyKeyMap (json) {
  const keys = {}
  try {
    Object.entries(json.jsonSchema.schema.properties).forEach(([key, { properties }]) => {
      Object.keys(properties).forEach(prop => {
        keys[`${key}_${prop}`] = `data.${prop}`
      })
    })
  } catch (e) {
    console.log('WARNING! Cannot get property key map')
  }
  return keys
}

function convertBoard (board, data) {
  const title = parseBoardTitle(board.boardTitleTemplate, data)

  const qscript = {
    title,
    widgets: [
      {
        type: 'header',
        attributes: {
          heading: title
        }
      }
    ]
  }

  board.content.forEach(content => {
    if (WIDGET_MAP[content.widget]) {
      const widget = new widgets[WIDGET_MAP[content.widget]](content, 'board').widget
      if (widget) qscript.widgets.push(widget)
    }
  })

  return qscript
}

function parseBoardTitle (template, data) {
  if (!data) return template
  const exp = JSON.parse(JSON.stringify(parse('`' + template + '`').body[0].expression))
  return evaluate(exp, data)
}

function convertForm (form, keymap) {
  const { schema, uiSchema, conditionalSchema } = form.jsonSchema

  const qscript = {
    title: schema.formtitle,
    widgets: [{
      type: 'header',
      attributes: {
        heading: schema.formtitle,
        desc: schema.formdescription,
        backgroundImage: schema.formimage,
        backgroundImageAltText: 'Alt Text Here'
      }
    }]
  }

  const newConditionalSchema = {}
  Object.entries(conditionalSchema).forEach(([k, conditions]) => {
    conditions.forEach(({ expression, dependents }) => {
      dependents.forEach(dep => {
        newConditionalSchema[dep] = []
        Object.entries(keymap).forEach(([key, value]) => {
          expression = expression.replace(key, value)
        })
        newConditionalSchema[dep].push(expression)
      })
    })
  })

  Object.keys(schema.properties).forEach(sectionId => {
    const section = schema.properties[sectionId]
    const set = {
      id: sectionId,
      type: 'set',
      attributes: {
        tocTitle: section.title
      }
    }
    if (section.properties) {
      qscript.widgets.push(
        set,
        {
          type: 'heading',
          attributes: { heading: section.title }
        }
      )

      Object.keys(section.properties).forEach(propertyId => {
        const uiSchema_ = uiSchema[sectionId][propertyId]

        let sectionRequired = section.required
        if (!sectionRequired) {
          console.log(`WARNING! The ${section.title} in ${schema.formtitle} has no required array?`)
          sectionRequired = []
        }

        const widget = generateWidget({
          id: propertyId,
          schema: section.properties[propertyId],
          uiSchema: uiSchema_,
          conditionalSchema: newConditionalSchema[`${sectionId}_${propertyId}`] || [],
          mandatory: sectionRequired.includes(propertyId)
        })
        if (widget) qscript.widgets.push(widget)
      })

      qscript.widgets.push({type: 'endSet'})
    } else {
      // Section is actually a widget
      const widget = generateWidget({
        id: sectionId,
        schema: section,
        uiSchema: uiSchema[sectionId],
        conditionalSchema: [],
        mandatory: false
      })
      if (widget) qscript.widgets.push(widget)
    }
  })

  return qscript
}

function generateWidget (options) {
  if (options.schema.type === 'array') {
    if (options.uiSchema['ui:widget'] && WIDGET_MAP[options.uiSchema['ui:widget']]) {
      return new widgets[WIDGET_MAP[options.uiSchema['ui:widget']]](options, 'form').widget
    } else if (options.uiSchema.items) {
      let isCheckBoxList = false
      options.uiSchema.items.forEach(i => { isCheckBoxList = i['ui:widget'] === 'checkField' })
      if (isCheckBoxList) {
        return new widgets['CheckboxList'](options, 'form').widget
      }
    }
  }
  // else parse as subform

  if (!options.uiSchema) throw new Error(`No uiSchema on ${options.id}`)

  return WIDGET_MAP[options.uiSchema['ui:widget']]
    ? new widgets[WIDGET_MAP[options.uiSchema['ui:widget']]](options, 'form').widget
    : null
}
