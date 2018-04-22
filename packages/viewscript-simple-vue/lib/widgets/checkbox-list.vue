
<template>
    <div class="form-group">
        <p class="form-text">{{heading}}</p>
        <p>{{desc}}</p>
        <slot></slot>
    </div>
</template>
<script>

  export default {
    props: ['widgetId', 'value', 'desc', 'enabled', 'heading', 'mandatory', 'maxLimit', 'minLimit', 'numericValue', 'titleMap'],
    components: {},
    mounted () {
    },

    // methods: {
    //   updateValue: function (value) {
    //     this.$emit('input', value)
    //   }
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
