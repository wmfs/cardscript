
<template>
    <div>
        <h3>{{heading}}</h3>
        <p>{{desc}}</p>
        <slot></slot>
        <hr>
    </div>
</template>
<script>

  export default {
    props: ['value', 'desc', 'enabled', 'heading', 'mandatory', 'maxLimit', 'minLimit', 'numericValue', 'titleMap'],
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
