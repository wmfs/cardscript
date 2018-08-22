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
    return {
      uiTemplate: {
        template: this.content.quasarTemplate
        // components: {},
        // data () {
        //   return {
        //     data: {},
        //     lists: {},
        //     internals: {}
        //   }
        // },
        // methods: {
        //   createNewSubView (subViewId) {},
        //   pushSubViewContent (subViewId) {},
        //   removeSubViewContent (subViewId, index) {}
        // }
      }
    }
  }
}
</script>
