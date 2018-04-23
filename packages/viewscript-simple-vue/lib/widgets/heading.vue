<template>
    <div>
        <h4 class="display-4" >{{heading}}</h4>
        <p class="lead">{{desc}}</p>
    </div>
</template>

<script>

  export default {
    props: [
      'widgetId',
      'desc',
      'heading'
    ],
    components: {},
    data () {
      return {
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add " scoped
  " attribute to limit CSS to this component only -->
<style scoped>
</style>
