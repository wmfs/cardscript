/* eslint-env mocha */

'use strict'
const extractToc = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript table-of-contents-extracting tests', function () {
  it('should extract some defaults from simple Viewscript', function () {
    const toc = extractToc(examples.simple)
    expect(toc.length).to.equal(0)
  })

  it('should extract some defaults from complex Viewscript', function () {
    const toc = extractToc(examples.complex)
    expect(toc).to.eql(
      [{widgetId: 'incidentSection', tocTitle: 'Incident'},
        {widgetId: 'patientSection', tocTitle: 'Patient'},
        {widgetId: 'airwaySection', tocTitle: 'Airway'},
        {widgetId: 'breathingSection', tocTitle: 'Breathing'},
        {widgetId: 'circulationSection', tocTitle: 'Circulation'},
        {widgetId: 'disabilitySection', tocTitle: 'Disability'},
        {widgetId: 'exposureSection', tocTitle: 'Exposure'},
        {widgetId: 'burnsSection', tocTitle: 'Burns'},
        {widgetId: 'cprSection', tocTitle: 'CPR'},
        {widgetId: 'medicationSection', tocTitle: 'Medication'},
        {widgetId: 'summarySection', tocTitle: 'Summary'}
      ]
    )
  })
})
