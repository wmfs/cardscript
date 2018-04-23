<template>
    <div class="card text-white bg-info mb-3">
        <div class="card-header">Header</div>
        <div class="card-body">
            <h5 class="card-title">{{heading}}</h5>
            <p class="card-text">{{desc}}</p>
        </div>
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
