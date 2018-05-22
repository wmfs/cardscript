const fs = require('fs')
const widgets = require('./widgets')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

const WIDGET_MAP = {
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

module.exports = async function reactJsonSchemaFormToViewScript (options, callback) {
  const store = memFs.create()
  const virtualFs = editor.create(store)
  const form = JSON.parse(await readFile(options.filePath))

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
    Object.values(form.jsonSchema.conditionalSchema).forEach(condition => {
      condition.forEach(c => {
        if (c.dependents.includes(sectionId)) {
          sectionCondition = convertExpression(c.expression)
        }
      })
    })

    const section = form.jsonSchema.schema.properties[sectionId]
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
            conditionalSchema.push(convertExpression(c.expression))
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
  })

  virtualFs.writeJSON(options.outputPath, viewscript, null, 2)
  virtualFs.commit(err => {
    if (err) callback(err)
    else callback(null, viewscript)
  })
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

function readFile (path) {
  return new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => {
    if (err) reject(err)
    else resolve(data)
  }))
}

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
