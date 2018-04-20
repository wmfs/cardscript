<template>
    <div class="container">
        <!--template += `<input id="${widget.key}_${value}" type="radio" ref="input" v-model="data.${widget.key}" value="${value}" name="${widget.key}">`-->
        <input type="radio" ref="input" :value="title" v-model="valueCopy" v-bind:name="widgetId" v-on:change="updateValue($event.target.value)">
        <p>{{title}}</p>
        <p>{{desc}}</p>
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
    .container {
        width: 200px;
        margin: 5px;
        background-color: aqua;
        float: left;
    }
</style>
