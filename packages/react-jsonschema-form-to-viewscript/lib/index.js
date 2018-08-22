const evaluate = require('static-eval')
const {parse} = require('esprima')

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

module.exports = function reactJsonSchemaFormToViewScript (view, uiType, data) {
  switch (uiType) {
    case 'board':
      return convertBoard(view, data)
    case 'form':
      return convertForm(view)
  }
}

function convertBoard (board, data) {
  const title = parseBoardTitle(board.boardTitleTemplate, data)

  const viewscript = {
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
      if (widget) viewscript.widgets.push(widget)
    }
  })

  return viewscript
}

function parseBoardTitle (template, data) {
  if (!data) return template
  const exp = JSON.parse(JSON.stringify(parse('`' + template + '`').body[0].expression))
  return evaluate(exp, data)
}

function convertForm (form) {
  const viewscript = {
    title: form.jsonSchema.schema.formtitle,
    widgets: [
      {
        type: 'header',
        attributes: {
          heading: form.jsonSchema.schema.formtitle,
          desc: form.jsonSchema.schema.formdescription,
          backgroundImage: form.jsonSchema.schema.formimage,
          backgroundImageAltText: 'Alt Text Here'
        }
      }
    ]
  }

  Object.keys(form.jsonSchema.schema.properties).forEach(sectionId => {
    let sectionCondition
    form.jsonSchema.conditionalSchema && Object.values(form.jsonSchema.conditionalSchema).forEach(condition => {
      condition.forEach(c => {
        if (c.dependents.includes(sectionId)) {
          // sectionCondition = convertExpression(c.expression)
        }
      })
    })

    const section = form.jsonSchema.schema.properties[sectionId]
    const set = {
      id: sectionId,
      type: 'set',
      attributes: {
        tocTitle: section.title
      }
    }
    if (sectionCondition) set.showWhen = sectionCondition
    if (section.properties) {
      viewscript.widgets.push(
        set,
        {
          type: 'heading',
          attributes: {
            heading: section.title
          }
        }
      )

      Object.keys(section.properties).forEach(propertyId => {
        const uiSchema = form.jsonSchema.uiSchema[sectionId][propertyId]
        const conditionalSchema = []
        Object.values(form.jsonSchema.conditionalSchema).forEach(condition => {
          condition.forEach(c => {
            if (c.dependents.includes(`${sectionId}_${propertyId}`)) {
              conditionalSchema.push(convertExpression(c.expression))
            }
          })
        })

        let sectionRequired = section.required
        if (!sectionRequired) {
          console.log(`WARNING! The ${section.title} in ${form.jsonSchema.schema.formtitle} has no required array?`)
          sectionRequired = []
        }
        const widget = generateWidget({
          id: propertyId,
          schema: section.properties[propertyId],
          uiSchema,
          conditionalSchema,
          mandatory: sectionRequired.includes(propertyId)
        })
        if (widget) viewscript.widgets.push(widget)
      })

      viewscript.widgets.push({type: 'endSet'})
    } else {
      // Section is actually a widget
      const widget = generateWidget({
        id: sectionId,
        schema: section,
        uiSchema: form.jsonSchema.uiSchema[sectionId],
        conditionalSchema: sectionCondition || [],
        mandatory: false // todo: find if required
      })
      if (widget) viewscript.widgets.push(widget)
    }
  })

  return viewscript
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

function convertExpression (expression) {
  return expression
    .split(' ')
    .map(part => {
      if (part.split('_')[0][0] === '"') return part
      else if (part.split('_').length === 2) return `data.${part.split('_')[1]}`
      else return part
    })
    .join(' ')
    .replace(/"/g, `'`)
}
