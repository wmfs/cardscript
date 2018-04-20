<template>
    <div v-bind:style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <h1>{{heading}}</h1>
        <p>{{desc}}</p>
    </div>
</template>

<script>

  export default {
    props: [
      'backgroundImage',
      'backgroundImageAltText',
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
