module.exports = function (definition, type) {
  if (type === 'form') {
    const { schema } = definition

    return [
      {
        type: 'Container',
        color: 'accent',
        spacing: 'medium',
        items: [
          {
            type: 'TextBlock',
            size: 'large',
            text: schema.title
          },
          {
            type: 'TextBlock',
            spacing: 'medium',
            size: 'medium',
            text: schema.description,
            wrap: true
          },
          {
            type: 'TextBlock',
            spacing: 'small',
            size: 'medium',
            text: schema.text,
            wrap: true,
            weight: 'lighter'
          }
        ]
      }
    ]
  } else if (type === 'board') {
    return {
      type: 'Textblock'
    }
  }
}
