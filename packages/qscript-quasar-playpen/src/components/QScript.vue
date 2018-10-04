<template>
  <div>
    <component :is="uiTemplate"/>
  </div>
</template>
<script>
  export default {
    name: 'QScript',
    props: ['content'],
    data () {
      const that = this
      const content = this.content
      return {
        uiTemplate: {
          template: content.quasarTemplate,
          components: {},
          validations: {
            data: content.validations
          },
          data () {
            return {
              data: content.data,
              lists: content.lists,
              internals: content.internals
            }
          },
          methods: {
            createNewSubView (subViewId) {
              const subViewDefaultValues = JSON.parse(JSON.stringify(this.internals.subViewDefaults[subViewId]))
              this.internals.currentSubViewData[subViewId] = subViewDefaultValues
              this.internals.dialogControl[subViewId] = true
            },
            pushSubViewContent (subViewId) {
              const parentSubViewId = this.internals.subViewParents[subViewId]
              const clone = JSON.parse(JSON.stringify(this.internals.currentSubViewData[subViewId]))

              if (parentSubViewId === null) {
                this.data[subViewId].push(clone)
              } else {
                this.internals.currentSubViewData[parentSubViewId][subViewId].push(clone)
              }
              this.internals.dialogControl[subViewId] = false
            },
            removeSubViewContent (subViewId, index) {
              alert(`REMOVE index ${index} from ${subViewId}`)
            },
            action (type, config) {
              that.$emit(type, config, this)
            }
          }
        }
      }
    }
  }
</script>
