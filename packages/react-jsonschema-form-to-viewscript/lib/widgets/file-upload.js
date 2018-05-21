module.exports = class FileUpload {
  constructor (options) {
    this.widget = {
      id: options.id,
      type: 'fileUpload',
      attributes: {
        heading: options.schema.title,
        mandatory: options.mandatory
      }
    }
  }
}
