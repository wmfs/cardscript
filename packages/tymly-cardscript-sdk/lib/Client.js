/*
  https://dexie.org
  https://github.com/axemclion/IndexedDBShim
  https://github.com/dfahlander/Dexie.js/issues/359
  https://itnext.io/indexeddb-your-second-step-towards-progressive-web-apps-pwa-dcbcd6cc2076
*/

const Logs = require('./Logs')
const Startables = require('./Startables')
const StateMachine = require('./State-machine')
const Settings = require('./Settings')
const Templates = require('./Templates')
const Search = require('./Search')
const Todo = require('./Todo')
const Watching = require('./Watching')
const Cards = require('./Cards')
const database = require('./database')

const USER_QUERY_KEYS = [
  'startables',
  'todo',
  'cards'
  // 'watching'
]

module.exports = class TymlyClient {
  constructor (options) {
    this.options = options
  }

  async init () {
    const { indexedDB, IDBKeyRange } = this.options.globalVars
    this.db = database({ indexedDB, IDBKeyRange })
    this.logs = new Logs(this)
    this.logs.applyPolicy()

    this.startables = new Startables(this)
    this.stateMachine = new StateMachine(this)
    this.settings = new Settings(this)
    this.templates = new Templates(this)
    this.search = new Search(this)
    this.todo = new Todo(this)
    this.watching = new Watching(this)
    this.cards = new Cards(this)

    await this.options.auth.init(this)

    const userQuery = await this.runUserQuery()
    console.log('>>>', userQuery.add.cards)

    for (const key of USER_QUERY_KEYS) {
      await this[key].persistFromUserQuery(userQuery)
      await this[key].load()
    }

    this.options.auth.startRefreshTimer()

    await this.logs.addLog({
      type: 'POSITIVE',
      code: 'INIT',
      title: 'Blah',
      message: 'Blah blah...'
    })
  }

  async runUserQuery () {
    const { ctx } = await this.stateMachine.execute({
      stateMachineName: 'tymly_getUserRemit_1_0',
      input: {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          formNames: {},
          startable: [],
          teams: [],
          todos: []
        }
      },
      token: this.options.token
    })

    return ctx.userRemit
  }

  destroy () {
    this.options.auth.cancelRefreshTimer()
  }
}
