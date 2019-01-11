/* eslint-env mocha */

'use strict'

const PORT = 3210

const { Client, Auth0 } = require('../lib')
const vuexStore = require('./fixtures/store')
const tymly = require('@wmfs/tymly')
const expect = require('chai').expect
const setGlobalVars = require('indexeddbshim')
const Vuex = require('vuex')
const Vue = require('vue')
const axios = require('axios')

let sdk, auth, tymlyServices, indexedDB, IDBKeyRange, store, authToken

const secret = 'Shhh!'
const audience = 'IAmTheAudience!'

describe('General tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  it('get an auth0 token', async () => {
    const { data } = await axios({
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

  it('boot Tymly', done => {
    tymly.boot(
      {
        pluginPaths: [
          require.resolve('@wmfs/tymly-express-plugin'),
          require.resolve('@wmfs/tymly-users-plugin'),
          require.resolve('@wmfs/tymly-solr-plugin'),
          require.resolve('@wmfs/tymly-rbac-plugin')
        ],
        blueprintPaths: [], // maybe make a test blueprint in fixtures (pizza one) ?
        config: {
          auth: {
            secret,
            audience
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
    const { server } = tymlyServices // do we need to use jwtAuth like in tymly runner?
    server.listen(PORT, () => {
      console.log(`Tymly server listening at ${PORT}`)
      done()
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
      logs
    } = store.state.app

    const {
      token
    } = store.state.auth

    expect(token).to.eql(authToken)

    expect(startables.length).to.eql(2)

    expect(watching.length).to.eql(1)
    expect(watching[0].title).to.eql('Incident 1/1999')

    expect(todos.length).to.eql(1)

    expect(logs.length).to.eql(1)
  })

  it(`should favourite a startable 'test_justAStateMachine_1_0'`, () => {
    sdk.startables.favourite('test_justAStateMachine_1_0')
  })

  it(`check the vuex store if the favourite startable 'test_justAStateMachine_1_0' has been added`, () => {
    const { favourites } = store.state.app
    expect(favourites).to.eql(['test_justAStateMachine_1_0'])
  })

  it(`should unfavourite a startable 'test_justAStateMachine_1_0'`, () => {
    sdk.startables.unfavourite('test_justAStateMachine_1_0')
  })

  it(`check the vuex store if the favourite startable 'test_justAStateMachine_1_0' has been removed`, () => {
    const { favourites } = store.state.app
    expect(favourites).to.eql([])
  })

  it('shutdown Tymly', async () => {
    await tymlyServices.tymly.shutdown()
  })
})
