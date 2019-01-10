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

const USER_QUERY_KEYS = [
  'startables',
  'todo',
  'watching'
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

    this.options.auth.init(this)
    // auth things

    const userQuery = this.runUserQuery()

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
      watching: {
        'a69c0ac9-cde5-11e7-abc4-cec278b6b61b': {
          id: 'a69c0ac9-cde5-11e7-abc4-cec278b6b61b',
          userId: 'test-user',
          stateMachineName: 'wmfs_incidentSummary_1_0',
          title: 'Incident 1/1999',
          category: 'incidents',
          categoryLabel: 'Incident Summary',
          description: 'Fire with 0 casualties and 0 fatalities'
        }
      },
      add: {
        categories: {
          fire: {},
          gazetteer: {},
          water: {}
        },
        todos: {
          'a69c0ac9-cde5-11e7-abc4-cec278b6b50a': {
            userId: 'test-user',
            teamName: null,
            stateMachineTitle: 'Process expense claim',
            stateMachineCategory: 'expenses',
            todoTitle: 'Homer Simpson',
            description: null,
            requiredHumanInput: null,
            launches: null,
            id: 'a69c0ac9-cde5-11e7-abc4-cec278b6b50a',
            created: '2019-01-09T09:58:28.644Z',
            createdBy: null,
            modified: '2019-01-09T09:58:28.644Z',
            modifiedBy: null
          }
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
          },
          'test_anotherOne_1_0': {
            name: 'test_anotherOne_1_0',
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
