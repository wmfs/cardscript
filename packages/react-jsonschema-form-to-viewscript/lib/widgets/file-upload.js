module.exports = class FileUpload {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'fileUpload',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory,
        formatRestriction: options.schema.DocumentFormat.value,
        maxFileSize: `${options.schema.allowedDocumentSize.value}kb`,
        maxNumberOfFiles: parseInt(options.schema.numberOfDocument.value)
      }
    }
    if (options.conditionalSchema.length > 0) this.widget.showWhen = options.conditionalSchema[0]
  }
}
