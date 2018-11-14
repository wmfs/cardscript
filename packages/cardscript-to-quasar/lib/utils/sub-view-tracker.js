class SubViewTracker {
  constructor () {
    this.subViews = []
  }

  insideASubView () {
    return this.subViews.length > 0
  }

  getCurrentSubView () {
    if (this.subViews.length === 0) {
      return null
    } else {
      return this.subViews[this.subViews.length - 1]
    }
  }

  addSubView (subViewId) {
    this.subViews.push(subViewId)
  }

  onRoot () {
    return this.subViews.length < 2
  }

  removeSubView (subViewId) {
    return this.subViews.pop()
  }
}

module.exports = new SubViewTracker()
