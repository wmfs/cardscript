// // import Dexie from 'dexie'
// const Dexie = require('dexie')
//
// const db = new Dexie('TymlyDatabase') // { indexedDB: window.indexedDB }
//
// function init () {
//   db.version(1).stores({
//     startables: `name, title, description, category, instigators`,
//     watching: ``,
//     todo: ``,
//     settings: ``
//   })
// }
//
// // export default db
// module.exports = db
// module.exports.init = init

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
