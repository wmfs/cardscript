module.exports = function elementGeneratorPicker (key, property, options) {
  let elementName
  switch (property.type) {
    case 'string':
      if (property.hasOwnProperty('enum')) {
        elementName = 'InputChoiceSet'
      } else {
        if (property.hasOwnProperty('format')) {
          switch (property.format) {
            case 'date-time':
              // TODO: Use example[0] to tweak to date / dateTime / time?
              elementName = 'InputDateTime'
              break
            case 'email':
              elementName = 'InputEmail'
              break
            case 'hostname':
              elementName = 'InputText'
              break
            case 'ipv4':
              elementName = 'InputText'
              break
            case 'ipv6':
              elementName = 'InputText'
              break
            case 'uri':
              elementName = 'InputText'
              break
            case 'uri-reference':
              elementName = 'InputText'
              break
            case 'json-pointer':
              elementName = 'InputText'
              break
            case 'uri-template':
              elementName = 'InputText'
              break
          }
        } else {
          // TODO: If enum then choiceset?
          elementName = 'InputText'
        }
      }
      break
    case 'integer':
      // TODO: If enum then choiceset?
      elementName = 'InputNumber'
      break
    case 'number':
      // TODO: If full range, then slider?
      // TODO: If enum then choiceset?
      elementName = 'InputNumber'
      break
    case 'boolean':
      elementName = 'InputToggle'
      break
    case 'object':
      elementName = 'CardView'
      break
  }
  return elementName
}
