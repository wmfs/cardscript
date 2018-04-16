module.exports = {
  showWhen: true,
  bindToDataModel: false,
  closingTag: false
}

// export function templateCompiler (widget) {
//   const attribs = []
//   attribs.push(`v-model = "data.${widget.key}"`)
//   attribs.push(`title="${widget.config.title}"`)
//   attribs.push(`description="${widget.config.description}"`)
//   return `<app-section ${attribs.join(' ')}></app-section>`
// }
