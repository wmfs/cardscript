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
      <editor
        v-model="formscript"
        @init="editorInit"
        lang="javascript"
        theme="dawn"
        width="100%"
        height="300px"
      ></editor>
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
  methods: {

    editorInit (editor) {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/javascript'),
      require('brace/theme/dawn')
      editor.setOptions(
        {
          showPrintMargin: false,
          fontFamily: 'Courier,monospace'
        }
      )
    },

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
  components: {
    editor: require('vue2-ace-editor')
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
  #formscript {
    height: 250px;
  }
</style>
