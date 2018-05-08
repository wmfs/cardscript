<template>
    <div>
    <component :is="uiTemplate"></component>
    </div>
</template>
<script>

  export default {
  name: 'Viewscript',
  props: ['content'],

  data () {
    const _this = this
    return {
      uiTemplate: {
        template: this.content.template,
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
          }
        }
      }
    }
  }
}
</script>