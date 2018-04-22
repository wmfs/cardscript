<template>
    <div class="form-group">
        <label v-bind:for="widgetId">{{heading}}</label>
        <small class="form-text">{{desc}}</small>
        <select class="form-control" v-bind:id="widgetId" v-bind:value="value" v-on:change="updateValue($event.target.value)" v-bind:placeholder="placeholder">
            <slot></slot>
        </select>
        <small class="form-text text-muted">{{help}}</small>
    </div>
</template>
<script>

  export default {
    props: ['widgetId', 'desc', 'enabled', 'heading', 'help', 'mandatory', 'numericValue', 'value', 'placeholder'],
    components: {},
    data () {
      return {
      }
    },
    mounted () {
    },

    methods: {
      updateValue: function (value) {
        this.$emit('input',value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
