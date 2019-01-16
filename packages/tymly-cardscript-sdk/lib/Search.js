module.exports = class Search {
  constructor (client) {
    this.store = client.options.store
    this.executions = client.executions
    this.token = client.options.token
  }

  executeSearch (options) {
    const {
      query
      // offset,
      // limit,
      // activeEvent,
      // categories,
      // lat,
      // long
    } = options

    return this.executions.execute({
      stateMachineName: 'tymly_search_1_0',
      input: {
        query
      },
      token: this.token
    })
  }

  async search (options) {
    const result = await this.executeSearch(options)
    // console.log('>>>', result)
    // save to recent searches to db and store
    // make sure to clear store - keep most recent 10
  }

  async getActiveEvents (options) {
    options.activeEvent = true
    const result = await this.executeSearch(options)
    this.store.save(result)
  }
}
