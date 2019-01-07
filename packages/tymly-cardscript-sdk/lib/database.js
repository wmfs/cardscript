import Dexie from 'dexie'

const db = new Dexie('myDb')
// db.version(1).stores({
//   friends: `name, age`
// })

export default db
