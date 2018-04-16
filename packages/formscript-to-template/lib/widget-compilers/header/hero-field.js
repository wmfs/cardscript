export function templateCompiler (widget) {
  // heroImageUrl

  return `<app-header title="${widget.config.heading}" description="${widget.config.description}" backgroundUrl="${widget.config.heroImageUrl}"></app-header>`
}
