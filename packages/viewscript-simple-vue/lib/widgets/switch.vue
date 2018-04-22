<template>
    <div class="form-group">
        <div class="form-check">
            <input v-bind:id="widgetId" class="form-check-input-lg" type="checkbox" :checked="value" :unchecked="!value" :value="value" v-on:change="updateValue(value)">
            <label class="form-check-label col-form-label-lg" v-bind:for="widgetId">{{heading}}</label>
            <small class="form-text text-muted">{{desc}}</small>
        </div>
    </div>
</template>
<script>

  export default {
    props: ['widgetId', 'value', 'heading', 'enabled', 'desc', 'mandatory', ],
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
