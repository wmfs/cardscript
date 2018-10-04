<template>
    <div>
    <component :is="uiTemplate"></component>
    </div>
</template>
<script>
export default {
  name: 'QScript',
  props: ['content', 'framework'],
  data () {
    const _this = this
    return {
      uiTemplate: {
        template: this.content.vuetifyTemplate,
        components: {},
        data: function () {
          return {
            data: _this.content.data,
            lists: _this.content.lists,
            internals: _this.content.internals
          }
        },
        methods: {
          createNewSubView: function launchSubView(subViewId) {
            const subViewDefaultValues = JSON.parse(JSON.stringify(this.internals.subViewDefaults[subViewId]))
            this.internals.currentSubViewData[subViewId] = subViewDefaultValues
            this.internals.dialogControl[subViewId] = true
          },
          pushSubViewContent: function pushSubViewContent(subViewId) {
            const parentSubViewId = this.internals.subViewParents[subViewId]
            const clone = JSON.parse(JSON.stringify(this.internals.currentSubViewData[subViewId]))

            if (parentSubViewId === null) {
              this.data[subViewId].push(clone)
            } else {
              this.internals.currentSubViewData[parentSubViewId][subViewId].push(clone)
            }
            this.internals.dialogControl[subViewId] = false
          },
          removeSubViewContent: function removeSubViewContent(subViewId, index) {
            alert(`REMOVE index ${index} from ${subViewId}`)
          }
        }
      }
    }
  }
}
</script>
