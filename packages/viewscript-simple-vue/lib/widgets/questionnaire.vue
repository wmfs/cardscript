<template>
    <div class="form-group">
        <h5 class="display-5">{{heading}}</h5>
        <p class="form-text">{{desc}}</p>
        <div class="card-group">
        <slot></slot>
        </div>
    </div>
</template>

<script>

  export default {
    props: ['widgetId', 'value', 'desc', 'enabled', 'heading', 'help', 'mandatory', 'numericValue'],
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
