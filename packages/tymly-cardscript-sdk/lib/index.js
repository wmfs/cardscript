/*
  https://dexie.org
  https://github.com/axemclion/IndexedDBShim
  https://itnext.io/indexeddb-your-second-step-towards-progressive-web-apps-pwa-dcbcd6cc2076
*/
const Auth0 = require('./Auth0')
const Startables = require('./Startables')
const StateMachine = require('./State-machine')
const Client = require('./Client')

module.exports = { Client, Auth0 }
