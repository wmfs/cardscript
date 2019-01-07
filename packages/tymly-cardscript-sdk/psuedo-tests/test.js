// this is just an example, todo: make into mocha tests

import { Client, Auth0 } from './../lib'

const auth0 = new Auth0({})

const sdk = new Client({
  auth: auth0,
  globalVars: {
    indexedDB: '', // set as shim
    console,
    setTimeout
  },
  store: '' // set as vuex store
})

sdk
  .init()
  .then(() => {
    console.log('SDK init complete')
  })
  .catch(err => {
    console.error(err)
  })

// make tests like blueprint tests
// require tymly and all the necessary plugins
// maybe make a test blueprint in fixtures (pizza one?)
