module.exports = class Templates {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  persistFromUserQuery (userQuery) {
    // todo
    // userQuery.templates
    // convert to quasarTemplateString and stuff
    // refer to playpen
    // write quasarTemplateString and stuff to indexedDB
  }

  loadTemplate (id) {
    // todo
    // get from indexedDb and put onto store via mutation
    // this.db.templates[id] = { template, toc, lists... }
  }

  unloadTemplates () {
    // todo
    // this.db.templates = {}
  }
}

// CARD IS INSTANCE OF TEMPLATE - therefore maybe we should put current impl. of Cards here instead?
