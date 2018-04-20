<template>
    <div>
        <h3>{{heading}}</h3>
        <p>{{desc}}</p>
        <input type="number" ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)" v-bind:placeholder="placeholder">
        <p>{{help}}</p>
    </div>
</template>
<script>

  export default {
    props: ['value', 'enabled', 'desc', 'heading', 'help', 'mandatory', 'maximum', 'minimum', 'placeholder'],
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
