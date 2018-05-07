class SubViewTracker {
  constructor () {
    this.subViews = []
  }

  addSubView (subViewId) {
    this.subViews.push(subViewId)
  }

  removeSubView (subViewId) {
    return this.subViews.pop()
  }
}

module.exports = new SubViewTracker()
