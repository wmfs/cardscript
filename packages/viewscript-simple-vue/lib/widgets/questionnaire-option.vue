<template>
    <div class="card text-center" style="width: 200px;">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{desc}}</h6>
            <input type="radio" ref="input" :value="title" v-model="valueCopy" v-bind:name="widgetId" v-on:change="updateValue($event.target.value)">
        </div>
    </div>
</template>

<script>

  export default {
    props: ['value', 'responseValue', 'widgetId', 'title', 'desc', 'icon'],
    components: {},
    data () {
      return {
        valueCopy: JSON.parse(this.value),
        isNumber: !isNaN(this.value)
      }
    },
    mounted () {
    },
    methods: {
      updateValue: function (value) {
        if (value) {
          // TODO: Might need more if there's no default, but return  number if default was a number
          if (this.isNumber) {
            this.$emit('input', Number(value))
          } else {
            this.$emit('input', value)
          }
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
