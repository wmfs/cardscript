/* eslint-env mocha */

'use strict'
const extractToc = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('qscript-examples')

describe('Run some QScript table-of-contents-extracting tests', function () {
  it('should extract some defaults from simple QScript', function () {
    const toc = extractToc(examples.simple)
    expect(toc.length).to.equal(0)
  })

  it('should extract some defaults from complex QScript', function () {
    const toc = extractToc(examples.complex)
    expect(toc).to.eql(
      [
        {
          tocIcon: 'account_box',
          tocTitle: 'Your Details',
          widgetId: 'yourDetails'
        },
        {
          tocIcon: 'local_pizza',
          tocTitle: 'The Pizza',
          widgetId: 'thePizza'
        }
      ]
    )
  })
})
