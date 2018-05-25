const evaluate = require('static-eval')
const { parse } = require('esprima')

const widgets = require('./widgets')

const WIDGET_MAP = {
  // buttonlist: '',
  // diarysummary: '',
  // markup: '',
  propertylist: 'PropertyList',
  // summary: '',
  // tabularlist: '',
  // taglist: '',
  // expandableNoticeField: '',
  // unknownField: '',
  textField: 'Text',
  selectField: 'Select',
  switchField: 'Switch',
  radioField: 'Radio',
  sliderField: 'Slider',
  noticeField: 'StickyNote',
  checkField: 'CheckboxList',
  dateField: 'Date',
  timeField: 'Time',
  // galleryField: '',
  // listField: '',
  // titleField: '',
  mapField: 'Map',
  // annotationField: '',
  fileUploader: 'FileUpload',
  questionnaire: 'Questionnaire',
  richTextArea: 'Richtext',
  numberField: 'Number',
  // repeatextFld: '',
  addressField: 'Address'
  // findField: '',
  // bookingField: ''
}

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

  board.content.map(content => {
    if (WIDGET_MAP[content.widget]) {
      const widget = new widgets[WIDGET_MAP[content.widget]](content).widget
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
    if (section.properties) {
      viewscript.widgets.push(
        {
          id: sectionId,
          type: 'set',
          attributes: {
            tocTitle: section.title
          },
          showWhen: sectionCondition
        },
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
              // conditionalSchema.push(convertExpression(c.expression))
            }
          })
        })
        const widget = generateWidget({
          id: propertyId,
          schema: section.properties[propertyId],
          uiSchema,
          conditionalSchema,
          mandatory: section.required.includes(propertyId)
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
      return new widgets[WIDGET_MAP[options.uiSchema['ui:widget']]](options).widget
    } else if (options.uiSchema.items) {
      let isCheckBoxList = false
      options.uiSchema.items.forEach(i => { isCheckBoxList = i['ui:widget'] === 'checkField' })
      if (isCheckBoxList) {
        return new widgets['CheckboxList'](options).widget
      }
    }
  }
  // else parse as subform

  return WIDGET_MAP[options.uiSchema['ui:widget']]
    ? new widgets[WIDGET_MAP[options.uiSchema['ui:widget']]](options).widget
    : null
}

/*
function convertExpression (expression) {
  if (expression[0] === '!') expression = expression.substring(1)
  if (expression[0] === '(') expression = expression.substring(1)
  if (expression[expression.length - 1] === ')') expression = expression.substring(0, expression.length - 1)

  return expression
    .split(' ')
    .map(element => {
      const e = element.split('_')
      return (e.length > 1) ? 'data.' + e[e.length - 1] : element
    })
    .join(' ')
}
*/
