module.exports = class Templates {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  persistFromUserQuery (userQuery) {
    // userQuery.templates
    // convert to quasarTemplateString and stuff
    // refer to playpen
    // write quasarTemplateString and stuff to indexedDB
  }

  loadTemplate (id) {
    // get from indexedDb and put onto store via mutation
    // this.db.templates[id] = { template, toc, lists... }
  }

  unloadTemplates () {
    // this.db.templates = {}
  }
}

// CARD IS INSTANCE OF TEMPLATE
