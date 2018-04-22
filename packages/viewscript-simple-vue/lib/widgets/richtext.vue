<template>
    <div class="form-group">
        <label v-bind:for="widgetId">{{heading}}</label>
        <small class="form-text">{{desc}}</small>
        <textarea class="form-control" v-bind:id="widgetId" v-bind:value="value" v-on:input="updateValue($event.target.value)"></textarea>
        <small class="form-text text-muted">{{help}}</small>
    </div>
</template>
<script>

  export default {
    props: ['widgetId', 'value', 'heading', 'enabled', 'desc', 'help', 'mandatory', 'minCharacters', 'maxCharacters'],
    components: {},
    data () {
      return {}
    },
    mounted () {
    },

    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
