const ComponentBuilder = require('./../utils/Component-builder')
const { inspect } = require('util')

module.exports = function (definition, options) {
  const {
    id
  } = definition

  const builder = new ComponentBuilder(definition)

  const modal = builder.addTag('q-modal')
  const dataPath = modal.getDataPath()

  const openBtn = builder.addTag('q-btn')
  openBtn.addAttribute('label', 'Collect Signature')
  openBtn.addAttribute('color', 'primary')
  openBtn.addAttribute('@click', `showSignatureModal(${inspect({ openId: `${dataPath}.${id}OpenModal`, id })})`)

  modal.addAttribute('v-model', `${dataPath}.${id}OpenModal`)
  modal.addAttribute(':maximized', true)
  modal.addAttribute('@show', `resize({id: '${id}'})`)

  const div = modal.addChildTag('div')

  const signPad = div.addChildTag('VueSignaturePad')
  signPad.addAttribute('id', `${id}SignaturePad`)
  signPad.addAttribute('width', '100%')
  signPad.addAttribute('height', '500px')
  signPad.addAttribute('ref', `${id}SignaturePad`)

  const cancel = div.addChildTag('q-btn')
  cancel.addAttribute('label', 'Cancel')
  cancel.addAttribute('color', 'primary')
  cancel.addAttribute('@click', `${dataPath}.${id}OpenModal = false`)
  cancel.addAttribute('class', 'q-ml-md q-mr-sm')
  cancel.addAttribute(':outline', true)

  const undo = div.addChildTag('q-btn')
  undo.addAttribute('label', 'Undo')
  undo.addAttribute('color', 'primary')
  undo.addAttribute('@click', `undoSign({id: '${id}'})`)
  undo.addAttribute('class', 'q-mr-sm')
  undo.addAttribute(':outline', true)

  const save = div.addChildTag('q-btn')
  save.addAttribute('label', 'Save')
  save.addAttribute('color', 'primary')
  save.addAttribute('@click', `saveSign({id: '${id}'})`)
  save.addAttribute('class', 'q-mr-sm')

  return builder.compile()
}
/*
todo:
change to modal

if data is NOT present button 'Collect signature'
else 'Change signature'

opens modal
sign pad in modal
undo/save button in modal
save button closes modal
*/
