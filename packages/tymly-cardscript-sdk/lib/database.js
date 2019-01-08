const Dexie = require('dexie')

module.exports = options => {
  const { indexedDB } = options
  const db = new Dexie('TymlyDatabase', { indexedDB })

  db.version(1).stores({
    startables: `name, title, description, category, instigators`,
    watching: ``,
    todo: ``,
    settings: ``
  })

  return db
}
