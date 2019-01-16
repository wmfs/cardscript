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

let sdk, auth, tymlyServices, indexedDB, IDBKeyRange, store, authToken, todoId, watchId, execName

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

  it('get the token from the store', () => {
    expect(auth.getToken()).to.eql(authToken)
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

  it('create todo entry for Prepare Pizza', async () => {
    const { ctx } = await sdk.executions.execute({
      stateMachineName: 'tymly_createTodoEntry_1_0',
      input: {
        todoTitle: 'Prepare Pizza',
        stateMachineTitle: 'Prepare Pizza',
        stateMachineCategory: 'pizza',
        description: 'You need to begin preparing the pizza.'
      },
      token: authToken
    })

    todoId = ctx.idProperties.id
  })

  it('refresh user query, check new todo entry exists', async () => {
    await sdk.persistUserQuery()

    const { todos } = store.state.app
    expect(todos.length).to.eql(1)
    expect(todos[0].id).to.eql(todoId)
  })

  it('remove the todo entry', async () => {
    await sdk.todo.remove(todoId)
    await sdk.persistUserQuery()

    const { todos } = store.state.app
    expect(todos.length).to.eql(0)
  })


  it(`watch 'test_orderPizza_1_0' instance`, async () => {
    const { ctx } = await sdk.watching.watch({
      stateMachineName: 'test_orderPizza_1_0',
      title: 'Pizza Order XYZ123',
      category: 'Food',
      categoryLabel: 'Food Order',
      description: 'Pepperoni and Jalapeno Pizza'
    })

    watchId = ctx.subscriptionId
  })

  it(`refresh user query, check the watching entry exists`, async () => {
    await sdk.persistUserQuery()

    const { watching } = store.state.app
    expect(watching.length).to.eql(1)
    expect(watching[0].subscriptionId).to.eql(watchId)
  })

  it(`unwatch 'test_orderPizza_1_0' instance`, async () => {
    const { ctx } = await sdk.watching.unwatch({
      subscriptionId: watchId
    })

    expect(ctx.subscriptionId).to.eql(watchId)
  })

  it(`refresh user query, check the watching entry exists`, async () => {
    await sdk.persistUserQuery()

    const { watching } = store.state.app
    expect(watching.length).to.eql(0)
  })

  it('check the executions store in the db', async () => {
    const data = await sdk.db.executions.toArray()
    expect(data.length).to.eql(11)

    execName = data[0].executionName
  })

  it('check if valid execution name exists in db', async () => {
    const exists = await sdk.executions.exists(execName)
    expect(exists).to.eql(true)
  })

  it('check if invalid execution name exists in db', async () => {
    const exists = await sdk.executions.exists('FakeExecutionName')
    expect(exists).to.eql(false)
  })

  it('load execution into store', async () => {
    await sdk.executions.load(execName)
    const { execution } = store.state.app
    expect(execution.executionName).to.eql(execName)
  })

  // hit executions.load()
  // check vuex store

  // remove an execution
  // check db

  // hit executions.load()
  // check vuex store again

  // start a form via executions api
  // check the execution is in table, with status AWAITING or w/e
  // progress the execution
  // try function hasDataChanged()

  it('shutdown Tymly', async () => {
    await tymlyServices.tymly.shutdown()
  })
})
