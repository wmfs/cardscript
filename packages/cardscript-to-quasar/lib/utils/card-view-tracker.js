class CardViewTracker {
  constructor () {
    this.cardViews = []
  }

  insideACardView () {
    return this.cardViews.length > 0
  }

  getCurrentCardView () {
    if (this.cardViews.length === 0) {
      return null
    } else {
      return this.cardViews[this.cardViews.length - 1]
    }
  }

  addCardView (cardViewId) {
    this.cardViews.push(cardViewId)
  }

  onRoot () {
    return this.cardViews.length < 2
  }

  removeCardView (cardViewId) {
    return this.cardViews.pop()
  }
}

module.exports = new CardViewTracker()
