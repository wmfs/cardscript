class SubViewTracker {
  constructor () {
    this.subViews = []
  }

  insideASubView () {
    return this.subViews.length > 0
  }

  getCurrentSubView () {
    return this.subViews[this.subViews.length - 1]
  }

  addSubView (subViewId) {
    this.subViews.push(subViewId)
  }

  removeSubView (subViewId) {
    return this.subViews.pop()
  }
}

module.exports = new SubViewTracker()
