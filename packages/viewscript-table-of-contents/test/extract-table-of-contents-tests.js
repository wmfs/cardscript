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
      [
        {widgetId: 'yourDetails', tocTitle: 'Your Details'},
        {widgetId: 'thePizza', tocTitle: 'The Pizza'}
      ]
    )
  })
})
