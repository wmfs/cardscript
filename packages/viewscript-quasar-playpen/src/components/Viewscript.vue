<template>
  <div>
    <component :is="uiTemplate" />
  </div>
</template>
<script>
export default {
  name: 'ViewscriptComponent',
  props: ['content'],
  data () {
    const content = this.content
    return {
      uiTemplate: {
        template: content.quasarTemplate,
        components: {},
        data () {
          return {
            data: content.data,
            lists: content.lists,
            internals: content.internals
          }
        },
        methods: {
          createNewSubView (subViewId) {},
          pushSubViewContent (subViewId) {},
          removeSubViewContent (subViewId, index) {}
        }
      }
    }
  }
}
</script>
