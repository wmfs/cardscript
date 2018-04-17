<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">Formscript Playpen</h1>
      <p class="lead">Provide some Formscript JSON in the
        editor below and then click the "Build!" button to turn it into something more useful. Please take a look at the <a
          href="https://github.com/wmfs/formscript">Formscript documentation</a> for more information.</p>
    </div>



    <div id="app">
      <h4>Formscript JSON</h4>
      <br>
      <codemirror v-model="formscript"></codemirror>
      <br>
      <a class="btn btn-primary btn-lg" href="#" role="button" v-on:click="renderFormscript()">Build!</a>
      <br>
      <br>

      <div v-if="validation.state === 'invalid'">
        <h3>There were errors...</h3>
        <div class="alert alert-danger" role="alert" v-for="error in validation.errors">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          {{error.property}}: {{error.message}}
        </div>
      </div>

      <div v-if="validation.state === 'valid'">
        <hr>
        <h3 id="success">Success!</h3>
        <br>
        <p>The supplied Formscript has been checked using the <a href="https://github.com/wmfs/formscript/tree/master/packages/formscript-schema">formscript-schema</a> package, and it passed!</p>
        <br>

        <vue-tabs>
          <v-tab title="Render">
            <br>
            <div class="alert alert-secondary" role="alert">
              This is an simple rendering of the Formscript provided above. Note this is only meant to be a basic illustration of typical web usage, clients are free to interpret Formscript and conjure a UI in any way they see fit!
            </div>
            <h1>1</h1>
            <formscript></formscript>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
          </v-tab>
          <v-tab title="Data">
          </v-tab>
          <v-tab title="Template">
            <br>
            <div class="alert alert-secondary" role="alert">
            This is output of running the above Formscript through the <a class="alert-link" href="https://github.com/wmfs/formscript/tree/master/packages/formscript-to-template">formscript-to-template</a> package. Here we've configured things to output in a Vue.js style, but Angular and React templates can be generated too!
            </div>
            <pre><code class="template">{{output.template.template}}</code></pre>
          </v-tab>
        </vue-tabs>
      </div>
    </div>

  </div>
</template>

<script>
import Formscript from 'formscript-simple-vue'
const example = JSON.stringify(require('./example'), null, 2)
const validator = require('formscript-schema').validateForm
const templateConverter = require('formscript-to-template').convert

export default {
  name: 'Playpen',
  components: {
    Formscript
  },
  mounted () {

  },
  methods: {
    renderFormscript: function render () {
      const parsed = JSON.parse(this.formscript)
      const result = validator(parsed)
      if (result.widgetsValid) {
        this.$set(this.validation, 'state', 'valid')
        this.$set(this.validation, 'errors', [])
        this.$set(this.output, 'template', templateConverter(parsed))
        this.$nextTick(function () {
          const e = document.getElementById("success");
          e.scrollIntoView();
        })
      } else {
        this.$set(this.validation, 'state', 'invalid')
        this.$set(this.validation, 'errors', result.errors)
        this.$set(this.output, 'template', '')
      }
    }
  },
  mounted () {
  },
  data () {
    return {
      example: example,
      formscript: example,
      validation: {
        state: 'notValidated',
        errors: []
      },
      output: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .template {
    white-space: pre;
    overflow-x: auto;
    display: inline-block;
    min-width: 100%;
  }
</style>
