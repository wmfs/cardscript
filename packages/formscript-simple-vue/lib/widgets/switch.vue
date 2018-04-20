<template>
    <div>
        <h3>{{heading}}</h3>
        <p>{{desc}}</p>
        <input type="checkbox" :checked="value" :unchecked="!value" :value="value" v-on:change="updateValue(value)">
    </div>
</template>
<script>

  export default {
    props: ['value', 'heading', 'enabled', 'desc', 'mandatory', ],
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
          this.$emit('input', false)
        } else {
          this.$emit('input', true)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
