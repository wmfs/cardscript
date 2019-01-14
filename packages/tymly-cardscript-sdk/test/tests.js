/* eslint-env mocha */

/*
pizza-blueprint

/card-templates
 - pizza-form
 - cancel-form
 - ordered-pizza

/categories
 - pizza

/models
 - orders
 - pizza

/state-machines
 - cancel-order
 - order-pizza
 - update-status

to-dos
 - prepare pizza
 - send pizza
 - cook pizza
 - order ingredients

watched boards
 - ordered pizza (x2)
*/

'use strict'

const PORT = 3210

const { Client, Auth0 } = require('../lib')
const vuexStore = require('./fixtures/store')
const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const setGlobalVars = require('indexeddbshim')
const Vuex = require('vuex')
const Vue = require('vue')
const axios = require('axios')

let sdk, auth, tymlyServices, indexedDB, IDBKeyRange, store, authToken

describe('General tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  before(function () {
    if (!(
      process.env.TYMLY_EXECUTIONS_URL &&
      process.env.AUTH0_DOMAIN &&
      process.env.AUTH0_CLIENT_ID &&
      process.env.AUTH0_CLIENT_SECRET &&
      process.env.AUTH0_AUDIENCE &&
      process.env.TYMLY_CERT_PATH // `https://${process.env.AUTH0_DOMAIN}.auth0.com/pem`
    )) {
      this.skip()
    }
  })

  it('boot Tymly', done => {
    tymly.boot(
      {
        pluginPaths: [
          require.resolve('@wmfs/tymly-express-plugin'),
          require.resolve('@wmfs/tymly-users-plugin'),
          require.resolve('@wmfs/tymly-solr-plugin'),
          require.resolve('@wmfs/tymly-rbac-plugin')
        ],
        blueprintPaths: [
          path.resolve(__dirname, './fixtures/pizza-blueprint')
        ],
        config: {
          auth: {
            certificate: process.env.TYMLY_CERT_PATH,
            audience: process.env.AUTH0_AUDIENCE
          },
          defaultUsers: {
            'Dave': ['tymly_tymlyTestAdmin']
          }
        }
      },
      (err, services) => {
        expect(err).to.eql(null)
        tymlyServices = services
        done()
      }
    )
  })

  it('start Tymly server', done => {
    const { server } = tymlyServices
    server.listen(PORT, () => {
      console.log(`Tymly server listening at ${PORT}`)
      done()
    })
  })

  it('get an auth0 token', async () => {
    const { data } = await axios.request({
      method: 'post',
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE
      }
    })

    authToken = data.access_token
  })

  it('set up Auth', () => {
    auth = new Auth0()
  })

  // get token tests

  it('set up IndexedDB shim', () => {
    const shim = {}
    global.window = global
    setGlobalVars(shim, { checkOrigin: false, memoryDatabase: ':memory:' })
    indexedDB = shim.indexedDB
    IDBKeyRange = shim.IDBKeyRange

    // indexedDB.__debug(true)
  })

  it('set up the Vuex store', () => {
    Vue.use(Vuex)
    store = new Vuex.Store(vuexStore)
  })

  it('set up the SDK Client', () => {
    sdk = new Client({
      appName: 'sdk-tests',
      auth,
      token: authToken,
      globalVars: {
        indexedDB,
        IDBKeyRange,
        console,
        setTimeout
      },
      store
    })
  })

  it('initialise the SDK Client', done => {
    sdk
      .init()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('load the logs from db to store', async () => {
    await sdk.logs.loadLogs()
  })

  it('load the auth token from db to store', async () => {
    await auth.loadToken()
  })

  it('check if the vuex store has been populated', () => {
    const {
      startables,
      watching,
      todos,
      cards,
      logs,
      favourites
    } = store.state.app

    const {
      token
    } = store.state.auth

    expect(token).to.eql(authToken)
    expect(logs.length).to.eql(1)
    expect(cards.length).to.eql(3)
    expect(startables.length).to.eql(3)
    expect(watching.length).to.eql(0)
    expect(favourites.length).to.eql(0)
    expect(todos.length).to.eql(0)
  })

  it(`should favourite a startable 'test_orderPizza_1_0'`, async () => {
    await sdk.startables.favourite('test_orderPizza_1_0')
  })

  it(`check the vuex store if the favourite startable 'test_orderPizza_1_0' has been added`, () => {
    const { favourites } = store.state.app
    expect(favourites).to.eql(['test_orderPizza_1_0'])
  })

  it(`check indexedDB if the favourite startable 'test_orderPizza_1_0 has been added'`, async () => {
    const favourites = await sdk.db.favourites.toArray()
    expect(favourites[0].favourites).to.eql(['test_orderPizza_1_0'])
  })

  it(`should unfavourite a startable 'test_orderPizza_1_0'`, async () => {
    await sdk.startables.unfavourite('test_orderPizza_1_0')
  })

  it(`check the vuex store if the favourite startable 'test_orderPizza_1_0' has been removed`, () => {
    const { favourites } = store.state.app
    expect(favourites).to.eql([])
  })

  it(`check indexedDB if the favourite startable 'test_orderPizza_1_0 has been removed'`, async () => {
    const favourites = await sdk.db.favourites.toArray()
    expect(favourites[0].favourites).to.eql([])
  })

  it('shutdown Tymly', async () => {
    await tymlyServices.tymly.shutdown()
  })
})
