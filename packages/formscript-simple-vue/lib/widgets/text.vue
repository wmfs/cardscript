<template>
    <div>
        <h3>{{heading}}</h3>
        <p>{{desc}}</p>
        <input type="text" ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)"
               v-bind:placeholder="placeholder">
        <p>{{help}}</p>
    </div>
</template>
<script>

  export default {
    props: ['value', 'heading', 'enabled', 'desc', 'help', 'placeholder', 'mandatory', 'minCharacters', 'maxCharacters'],
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
