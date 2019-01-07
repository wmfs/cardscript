const Logs = require('./Logs')
const Startables = require('./Startables')
const StateMachine = require('./State-machine')
const Settings = require('./Settings')
const Templates = require('./Templates')
const Search = require('./Search')
const Todo = require('./Todo')
const Watching = require('./Watching')
const db = require('./database')

module.exports = class TymlyClient {
  constructor (options) {
    this.options = options
  }

  init () {
    this.db = db
    this.logs = new Logs(this)
    this.logs.applyPolicy()

    this.startables = new Startables(this)
    this.stateMachine = new StateMachine(this)
    this.settings = new Settings(this)
    this.templates = new Templates(this)
    this.search = new Search(this)
    this.todo = new Todo(this)
    this.watching = new Watching(this)

    this.options.auth.init(this)
    // create tables, etc. in IndexedDB
    // such as 'startables' to begin with

    // auth things

    const userQuery = this.runUserQuery() // think remit

    // for all the remit things
    // persistFromUserQuery(userQuery)
    // load()

    this.options.auth.startRefreshTimer()

    this.logs.addSuccess('INIT', 'Blah', 'Blah blah...')
    // return promise
  }

  async runUserQuery () {
    // return user remit json
  }

  destroy () {
    this.options.auth.cancelRefreshTimer()
  }
}
