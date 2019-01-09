/* eslint-env mocha */

'use strict'
const manifestor = require('./../lib/').getSimpleManifest
const chai = require('chai')
const expect = chai.expect
const requiredElements = ['Action.Cancel', 'Action.OpenUrl', 'Action.Save', 'Action.ShowCard', 'Action.Submit',
  'ActionSet', 'AdaptiveCard', 'AddressBlock', 'CardList', 'Chip', 'Collapsible', 'Column', 'ColumnSet', 'Container',
  'Fact', 'FactSet', 'Image', 'ImageSet', 'Input.Address', 'Input.ApiLookup', 'Input.Choice', 'Input.ChoiceSet',
  'Input.Currency', 'Input.Date', 'Input.DateTime', 'Input.Email', 'Input.FileUpload', 'Input.Gender', 'Input.Name',
  'Input.Number', 'Input.Signature', 'Input.Slider', 'Input.TelephoneNumber', 'Input.Text', 'Input.Time', 'Input.Toggle',
  'Jumbotron', 'Map', 'Media', 'MediaSource', 'PhaseBanner', 'Separator', 'Tab', 'Table', 'TabSet', 'TextBlock']

describe('Run some manifestation tests', () => {
  it('should check all required elements are present', () => {
    const result = manifestor()
    Object.values(result.elements).map(element => {
      expect(requiredElements.includes(element.type)).to.equal(true)
      requiredElements.splice(requiredElements.indexOf(element.type), 1)
    })
    expect(requiredElements.length).to.equal(0)
  })
})
