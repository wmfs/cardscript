module.exports = function addfilters (Vue) {
  Vue.filter('replaceWithTitle', function (value, simpleTitleMap) {
    if (!value) return ''
    return simpleTitleMap[value]
  })
}
