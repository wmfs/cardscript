const ComponentBuilder = require('./../utils/Component-builder')
const { inspect } = require('util')

module.exports = function (definition, options) {
  const {
    id
  } = definition

  const builder = new ComponentBuilder(definition)

  const modal = builder.addTag('q-modal')
  const dataPath = modal.getDataPath()

  const imgDiv = builder.addTag('div')
  imgDiv.addAttribute('v-if', `${dataPath}.${id} && ${dataPath}.${id}.length > 0`)
  const img = imgDiv.addChildTag('img')
  img.addAttribute(':src', `${dataPath}.${id}`)
  img.addAttribute('width', '100%')
  img.addAttribute('height', '100%')

  const opts = inspect({ dataPath, id })

  const openBtn = builder.addTag('q-btn')
  openBtn.addAttribute(':label', `${dataPath}.${id} && ${dataPath}.${id}.length > 0 ? 'Change Signature' : 'Collect Signature'`)
  openBtn.addAttribute('color', 'primary')
  openBtn.addAttribute('@click', `showSignatureModal(${opts})`)

  modal.addAttribute('v-model', `${dataPath}.${id}OpenModal`)
  modal.addAttribute(':maximized', true)
  modal.addAttribute('@show', `resize(${opts})`)

  const div = modal.addChildTag('div')

  const signPad = div.addChildTag('VueSignaturePad')
  signPad.addAttribute('id', `${id}SignaturePad`)
  signPad.addAttribute('width', '100%')
  signPad.addAttribute('height', '500px')
  signPad.addAttribute('ref', `${id}SignaturePad`)

  const close = div.addChildTag('q-btn')
  close.addAttribute('label', 'Close')
  close.addAttribute('color', 'primary')
  close.addAttribute('@click', `${dataPath}.${id}OpenModal = false`)
  close.addAttribute('class', 'q-ml-md q-mr-sm')
  close.addAttribute(':outline', true)

  const clear = div.addChildTag('q-btn')
  clear.addAttribute('label', 'Clear')
  clear.addAttribute('color', 'primary')
  clear.addAttribute('@click', `clearSign(${opts})`)
  clear.addAttribute('class', 'q-mr-sm')
  clear.addAttribute(':outline', true)

  const undo = div.addChildTag('q-btn')
  undo.addAttribute('label', 'Undo')
  undo.addAttribute('color', 'primary')
  undo.addAttribute('@click', `undoSign(${opts})`)
  undo.addAttribute('class', 'q-mr-sm')
  undo.addAttribute(':outline', true)

  const save = div.addChildTag('q-btn')
  save.addAttribute('label', 'Save')
  save.addAttribute('color', 'primary')
  save.addAttribute('@click', `saveSign(${opts})`)
  save.addAttribute('class', 'q-mr-sm')

  return builder.compile()
}
/*
todo:
change signature needs to re-render signature if you navigate from page and back
*/
