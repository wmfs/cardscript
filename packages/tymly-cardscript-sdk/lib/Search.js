module.exports = class Search {
  constructor (client) {
    this.store = client.options.store
    this.executions = client.executions
  }

  executeSearch (options) {
    // const {
    //   query,
    //   offset,
    //   limit,
    //   activeEvent,
    //   categories,
    //   lat,
    //   long
    // } = options

    return this.executions.execute('tymly_search_1_0', {})
  }

  async search (options) {
    const result = await this.executeSearch(options)
    this.store.save(result)
    // save to recent searches to db and store
    // make sure to clear store - keep most recent 10
  }

  async getActiveEvents (options) {
    options.activeEvent = true
    const result = await this.executeSearch(options)
    this.store.save(result)
  }
}
