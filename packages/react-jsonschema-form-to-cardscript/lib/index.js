const evaluate = require('static-eval')
const { parse } = require('esprima')

const ELEMENTS = require('./elements')

const BOARD_ELEMENTS = {
  propertylist: 'FactSet',
  buttonlist: 'ActionSet',
  tabularlist: 'Table'
  // maplist
  // summary
}

const FORM_ELEMENTS = {
  textField: 'Input.Text',
  numberField: 'Input.Number',
  addressField: 'Input.Address',
  selectField: 'Input.ChoiceSet',
  radioField: 'Input.ChoiceSet',
  questionnaire: 'Input.ChoiceSet',
  switchField: 'Input.Toggle',
  sliderField: 'Input.Slider',
  dateField: 'Input.Date',
  fileUploader: 'Input.FileUpload',
  noticeField: 'TextBlock',
  expandableNoticeField: 'Collapsible',
  findField: 'Input.ApiLookup'
}

module.exports = function (json, uiType, data) {
  const cardscript = {
    type: 'AdaptiveCard',
    body: [],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0'
  }

  switch (uiType) {
    case 'board':
      return convertBoard(json, data)
    case 'form':
      return convertForm(json)
  }

  function convertBoard (board, data) {
    if (board.boardTitleTemplate) {
      const title = parseBoardTitle(board.boardTitleTemplate, data)

      cardscript.body.push(
        ELEMENTS['Jumbotron']({ title }, 'board')
      )
    }

    board.content.forEach(content => {
      if (BOARD_ELEMENTS[content.widget]) {
        if (ELEMENTS[BOARD_ELEMENTS[content.widget]]) {
          cardscript.body.push(
            ELEMENTS[BOARD_ELEMENTS[content.widget]](content, 'board')
          )
        } else {
          console.log(`${BOARD_ELEMENTS[content.widget]} is not yet implemented.`)
        }
      } else {
        console.log(`No conversion for ${content.widget} yet.`)
      }
    })

    return cardscript
  }

  function parseBoardTitle (template, data) {
    if (!data) return template
    const exp = JSON.parse(JSON.stringify(parse('`' + template + '`').body[0].expression))
    return evaluate(exp, data)
  }

  function convertForm (form) {
    const { schema, uiSchema } = form.jsonSchema

    cardscript.body.push(
      ELEMENTS['Jumbotron']({ title: schema.formtitle, subtitle: schema.formdescription }, 'form')
    )

    Object.keys(schema.properties).forEach(sectionId => {
      const section = schema.properties[sectionId]
      const items = [{
        type: 'TextBlock',
        text: section.title,
        wrap: true,
        spacing: 'large',
        size: 'extraLarge'
      }]

      if (section.description) {
        items.push({
          type: 'TextBlock',
          text: section.description,
          wrap: true,
          size: 'medium',
          weight: 'lighter'
        })
      }

      Object.keys(section.properties).forEach(propertyId => {
        const widget = uiSchema[sectionId][propertyId] ? uiSchema[sectionId][propertyId]['ui:widget'] : undefined

        if (widget === 'richTextArea') {
          const elements = ELEMENTS['Input.Text']({
            id: propertyId,
            schema: section.properties[propertyId],
            uiSchema: uiSchema[sectionId][propertyId],
            editor: true
          }, 'form')
          items.push(...elements)
        } else if (widget) {
          if (FORM_ELEMENTS[widget]) {
            if (ELEMENTS[FORM_ELEMENTS[widget]]) {
              const elements = ELEMENTS[FORM_ELEMENTS[widget]]({
                id: propertyId,
                schema: section.properties[propertyId],
                uiSchema: uiSchema[sectionId][propertyId]
              }, 'form')
              items.push(...elements)
            } else {
              console.log(`${FORM_ELEMENTS[widget]} is not yet implemented for ${sectionId}.${propertyId}.`)
            }
          } else {
            console.log(`No conversion for ${widget} for ${sectionId}.${propertyId} yet.`)
          }
        } else {
          const field = uiSchema[sectionId][propertyId] ? uiSchema[sectionId][propertyId]['ui:field'] : undefined
          if (field === 'ArrayField') {
            const notCheckField = uiSchema[sectionId][propertyId].items.filter(i => i['ui:widget'] !== 'checkField').length > 0
            if (!notCheckField) {
              const elements = ELEMENTS['Input.ChoiceSet']({
                id: propertyId,
                schema: {
                  title: section.properties[propertyId].title,
                  enum: section.properties[propertyId].items.map((i, idx) => i.key || idx),
                  enumNames: section.properties[propertyId].items.map(i => i.title)
                },
                uiSchema: {
                  'ui:widget': 'checkField'
                }
              }, 'form')
              items.push(...elements)
            } else {
              console.log(`Cannot create element for ${sectionId}.${propertyId}.`)
            }
          } else {
            console.log(`Cannot create element for ${sectionId}.${propertyId}.`)
          }
        }
      })

      cardscript.body.push({
        type: 'Container',
        id: sectionId,
        title: section.title,
        items
      })
    })

    return cardscript
  }
}
