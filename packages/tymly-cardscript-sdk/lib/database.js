const Dexie = require('dexie')

module.exports = options => {
  const { indexedDB, IDBKeyRange } = options

  // Dexie.dependencies.indexedDB = indexedDB
  // Dexie.dependencies.IDBKeyRange = IDBKeyRange

  const db = new Dexie('TymlyDatabase', { indexedDB, IDBKeyRange })

  db.version(2).stores({
    startables: `&name, title, description, category, instigators`,
    todo: `&id, todoTitle, description`,
    logs: `++, message, date`,
    watching: `&id, title, description`,
    auth: `&id, token`,
    cards: `&id`
  })

  // db.open()

  return db
}

// https://dexie.org/docs/Version/Version.stores()
