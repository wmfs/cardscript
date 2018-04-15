<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">Formscript Playpen</h1>
      <p class="lead">Provide some Formscript JSON in the
        editor below and then click the "Build!" button to turn it into something more useful. Please take a look at the <a
          href="https://github.com/wmfs/formscript">Formscript documentation</a> for more information.</p>
    </div>


    <div id="app">

      <h3>STEP 1: Formscript JSON</h3>

      <div class="code-window">
        <header class="code-header">
          <div class="code-buttons"></div>formscript-sample.json</header>
          <codemirror v-model="formscript"></codemirror>
      </div>

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
        VALID!
      </div>
    </div>

  </div>
</template>

<script>
const example = JSON.stringify(require('./example'), null, 2)
const validator = require('formscript-schema').validateForm
export default {
  name: 'Playpen',
  mounted () {

  },
  methods: {
    renderFormscript: function render () {
      const result = validator(JSON.parse(this.formscript))
      if (result.widgetsValid) {
        this.$set(this.validation, 'state', 'valid')
        this.$set(this.validation, 'errors', [])
      } else {
        this.$set(this.validation, 'state', 'invalid')
        this.$set(this.validation, 'errors', result.errors)
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
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .code-window {
    height: 332px;
    border-radius: 4px;
    background: #fff;
    margin-top: 3rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .code-window .code-header {
    background: #ececec;
    padding: 0.4rem;
    font-size: 1.7rem;
    position: relative;
    color: #a5a5a5;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
  }

  .code-window .code-header .code-buttons {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 12px;
    margin-left: 35px;
    width: 11px;
    height: 11px;
    background: #a5a5a5;
    border-radius: 50%;
    box-shadow: -20px 0 0 #a5a5a5, 20px 0 0 #a5a5a5;
  }
  .code-window .code-editor {
    position: relative;
    height: 340px;
    color: #444;
  }
</style>
