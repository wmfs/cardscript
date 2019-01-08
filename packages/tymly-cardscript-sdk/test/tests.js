/* eslint-env mocha */

'use strict'

const PORT = 3210

const { Client, Auth0 } = require('../lib')
const tymly = require('@wmfs/tymly')
const chai = require('chai')
const expect = chai.expect
const setGlobalVars = require('indexeddbshim')
const Vuex = require('vuex')
const Vue = require('vue')

let sdk, auth, tymlyServices, indexedDB, IDBKeyRange, store

describe('Run some tests', () => {
  it('set up Auth', () => {
    auth = new Auth0({})
  })

  it('set up IndexedDB shim', () => {
    const shim = {}
    global.window = global
    setGlobalVars(shim, { checkOrigin: false })
    indexedDB = shim.indexedDB
    IDBKeyRange = shim.IDBKeyRange
  })

  it('set up the Vuex store', () => {
    Vue.use(Vuex)
    store = new Vuex.Store({
      state: {
        startables: {}
      },
      mutations: {
        startables: (state, startables) => { state.startables = startables },
        startable: (state, startable) => Vue.set(state.startables, startable.name, startable)
      }
    })
  })

  it('set up the SDK Client', () => {
    sdk = new Client({
      auth,
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
        blueprintPaths: [],
        config: {
          auth: {
            secret: 'Shhh!',
            audience: 'IAmTheAudience!'
          },
          defaultUsers: {
            'Dave': ['tymly_tymlyTestAdmin']
          }
        }
      },
      (err, services) => {
        tymlyServices = services
        done(err)
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
  })

  it('check if the vuex store has things', () => {
    const { startables } = store.state
    expect(startables).to.not.eql({})
  })

  it('shutdown Tymly', async () => {
    await tymlyServices.tymly.shutdown()
  })
})
