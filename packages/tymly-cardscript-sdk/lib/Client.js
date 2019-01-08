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
const database = require('./database')
// const axios = require('axios')

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

    this.options.auth.init(this)
    // auth things

    const userQuery = this.runUserQuery()

    // for all the remit things
    // persistFromUserQuery(userQuery)
    // load()

    await this.startables.persistFromUserQuery(userQuery)
    await this.startables.load()

    this.options.auth.startRefreshTimer()

    this.logs.addLog('SUCCESS', 'INIT', 'Blah', 'Blah blah...')
    // return promise
  }

  runUserQuery () {
    // this is just an example taken from tymly-users-plugin tests
    return {
      settings: [
        'gazetteer',
        'hr',
        'expenses'
      ],
      favouriteStartableNames: [
        'notifications',
        'settings'
      ],
      add: {
        categories: {
          fire: {},
          gazetteer: {},
          water: {}
        },
        todos: {
          'a69c0ac9-cde5-11e7-abc4-cec278b6b50a': {}
        },
        teams: {
          'Fire Safety (North)': {},
          'Birmingham (Red watch)': {}
        },
        cards: {
          'test_simple': {}
        },
        forms: {
          'test_addIncidentLogEntry': {},
          'test_addIncidentSafetyRecord': {},
          'test_bookSomeoneSick': {}
        },
        boards: {
          'test_personalDetails': {},
          'test_propertyViewer': {}
        },
        startable: {
          'test_justAStateMachine_1_0': {
            name: 'test_justAStateMachine_1_0',
            title: 'State Machine',
            description: 'Just a State Machine',
            category: ['hr'],
            instigators: ['user']
          }
        }
      },
      remove: {}
    }

    // return user remit json
    // get port from options?
    // need token from auth client?
    // const response = await axios({
    //   method: 'post',
    //   url: 'http://localhost:3210/executions',
    //   data: {
    //     stateMachineName: 'tymly_getUserRemit_1_0',
    //     input: {},
    //     options: {
    //       instigatingClient: {
    //         appName: 'tymly-cardscript-sdk',
    //         domain: ''
    //       },
    //       sendResponse: 'COMPLETE'
    //     }
    //   },
    //   headers: {}
    // })
  }

  destroy () {
    this.options.auth.cancelRefreshTimer()
  }
}
