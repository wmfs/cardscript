<template>
    <div class="form-group">
        <label v-bind:for="widgetId">{{heading}}</label>
        <input type="number" class="form-control" v-bind:id="widgetId" v-bind:value="value" v-on:input="updateValue($event.target.value)">
        <small class="form-text text-muted">{{help}}</small>
    </div>
</template>
<script>

  export default {
    props: ['widgetId', 'value', 'enabled', 'heading', 'desc', 'help', 'mandatory', 'maximum', 'minimum', 'step'],
    components: {},
    data () {
      return {
      }
    },
    mounted () {
    },

    methods: {
      updateValue: function (value) {
        if (value) {
          this.$emit('input', Number(value))
        } else {
          this.$emit('input', null)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
