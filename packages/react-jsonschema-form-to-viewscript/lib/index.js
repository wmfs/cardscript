const fs = require('fs')
const widgets = require('./widgets')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

const WIDGET_MAP = {
  // expandableNoticeField: '',
  // unknownField: '',
  textField: 'text',
  selectField: 'select',
  switchField: 'switch',
  radioField: 'radio',
  sliderField: 'slider',
  noticeField: 'sticky-note',
  checkField: 'checkbox-list',
  dateField: 'date',
  timeField: 'time',
  // galleryField: '',
  // listField: '',
  // titleField: '',
  mapField: 'map',
  // annotationField: '',
  fileUploader: 'file-upload',
  questionnaire: 'questionnaire',
  richTextArea: 'richtext',
  numberField: 'number',
  // repeatextFld: '',
  addressField: 'address'
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
    const section = form.jsonSchema.schema.properties[sectionId]
    viewscript.widgets.push(
      {
        id: sectionId,
        type: 'set',
        attributes: {
          tocTitle: section.title
        }
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
            // TODO: Replace keys in expression with data.propertyId
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
  if (options.uiSchema['ui:field'] === 'ArrayField') {
    // TODO: Do something different!
  }

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
