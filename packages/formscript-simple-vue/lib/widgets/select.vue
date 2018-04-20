<template>
    <div>
        <h3>{{heading}}</h3>
        <p>{{desc}}</p>
        <select ref="input" v-bind:value="value" v-on:change="updateValue($event.target.value)" v-bind:placeholder="placeholder">
            <slot></slot>
        </select>
        <p>{{help}}</p>
    </div>
</template>
<script>

  export default {
    props: ['desc', 'enabled', 'heading', 'help', 'mandatory', 'numericValue', 'value', 'placeholder'],
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
