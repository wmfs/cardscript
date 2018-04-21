/* eslint-env mocha */

'use strict'
const extractDefaults = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('formscript-examples')

describe('Run some Formscript default-extracting tests', function () {
  it('should extract no defaults from some simple Formscript', function () {
    const result = extractDefaults(examples.simple)
    expect(result).to.eql({})
  })

  it('should extract some defaults from complex Formscript', function () {
    const result = extractDefaults(examples.complex)
    expect(result).to.eql(
      {
        collapse: 'NO',
        signsOfLife: 'YES',
        gurgling: 'NOT_APPLICABLE',
        snoring: 'NOT_APPLICABLE',
        cspine: 'CLEAR',
        choking: 'NOT_APPLICABLE',
        airwayStatus: 'TALKING',
        alwaysBreathing: 'YES',
        chestInjury: 'NO',
        bleeding: 'NO',
        shock: 'NO',
        radialPulse: 'NOT_ASSESSED',
        limbMovement: ['LEFT_ARM', 'RIGHT_ARM', 'LEFT_LEG', 'RIGHT_LEG'],
        avpuArrival: 'ALERT',
        avpuHandover: 'ALERT',
        painArrival: 1,
        painHandover: 1,
        exposure: 'NOT_NECESSARY',
        burns: false,
        cprGiven: false,
        numShocks: 1
      }
    )
  })
})
