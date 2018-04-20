<template>
    <div>
        <h3>{{heading}}</h3>
        <p>{{desc}}</p>
        <slot></slot>
        <div class="clear"></div>
    </div>
</template>

<script>

  export default {
    props: ['value', 'desc', 'enabled', 'heading', 'help', 'mandatory', 'numericValue'],
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
    .clear {
        clear: both;
    }
</style>
