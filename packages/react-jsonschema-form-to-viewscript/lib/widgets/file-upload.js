module.exports = class FileUpload {
  constructor (options) {
    if (!options.schema.DocumentFormat) {
      options.schema.DocumentFormat = {
        value: ['pdf', 'jpg']
      }
    }
    if (!options.schema.allowedDocumentSize) {
      options.schema.allowedDocumentSize = {
        value: 5
      }
    }
    if (!options.schema.numberOfDocument) {
      options.schema.numberOfDocument = {
        value: 5
      }
    }
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
