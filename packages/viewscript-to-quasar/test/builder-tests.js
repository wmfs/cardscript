/* eslint-env mocha */

'use strict'
const Builder = require('./../lib/utils/Component-builder')
const chai = require('chai')
const expect = chai.expect

describe('Core Builder tests', function () {
  it('Simple root tags', function () {
    const builder = new Builder()
    const a = builder.addTag('A')
    a.addChildTag('B')
    const c = builder.addTag('C')
    c.addChildTag('D')
    const template = builder.compile()
    expect(template).to.eql('<A><B></B></A><C><D></D></C>')
  })

  it('Simple root tags with content', function () {
    const builder = new Builder()
    const a = builder.addTag('A')
    a.content('text_a')
    const b = a.addChildTag('B')
    b.content('text_b')
    const c = a.addChildTag('C')
    c.content('text_c')
    const d = builder.addTag('D')
    d.content('text_d')
    const e = d.addChildTag('E')
    e.content('text_e')
    const f = d.addChildTag('F')
    f.content('text_f')
    const template = builder.compile()
    expect(template).to.eql('<A>text_a<B>text_b</B><C>text_c</C></A><D>text_d<E>text_e</E><F>text_f</F></D>')
  })

  it('Simple root tags with attributes', function () {
    const builder = new Builder()
    const a = builder.addTag('A')
    a.addAttribute('a1', null)
    a.addAttribute('a2', 'A_VALUE')
    a.addAttribute('shouldNotAppear')
    const b = a.addChildTag('B')
    b.addAttribute('b1', null)
    b.addAttribute('b2', 'B_VALUE')
    b.addAttribute('shouldNotAppear')
    const template = builder.compile()
    expect(template).to.eql('<A a1 a2="A_VALUE"><B b1 b2="B_VALUE"></B></A>')
  })
})
