<template>
    <div class="form-group">
        <p class="form-text">{{heading}}</p>
        <small class="form-text">{{desc}}</small>
        <slot></slot>
        <small class="form-text text-muted">{{help}}</small>
    </div>
</template>

<script>

  export default {
    props: ['widgetId', 'desc', 'enabled', 'heading', 'help', 'mandatory', 'numericValue'],
    components: {},
    data () {
      return {
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
