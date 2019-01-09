const Dexie = require('dexie')

module.exports = options => {
  const { indexedDB } = options
  const db = new Dexie('TymlyDatabase', { indexedDB })

  db.version(1).stores({
    startables: `name, title, description, category, instigators`,
    todo: `&id, todoTitle, description`,
    watching: `&id, title, description`,
    settings: ``,
    favourites: ``
  })

  db.open()

  return db
}

// https://dexie.org/docs/Version/Version.stores()
