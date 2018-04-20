<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">Formscript Playpen</h1>
      <p class="lead">Hack around with some Formscript JSON in the editor below and then click the "<strong>Parse!</strong>" button to try it out. Please take a look at the <a href="https://github.com/wmfs/formscript">Formscript documentation</a> for more information.</p>
    </div>

    <div id="app">
      <h4>Formscript JSON</h4>
      <br>
      <codemirror id="editor" v-model="formscript"></codemirror>
      <br>

      <a class="btn btn-primary btn-lg" href="#" role="button" v-on:click="renderFormscript()">Parse!</a>
      <div class="dropup float-right">
        <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" v-on:click="setExampleContent('simple')">Simple example</a>
          <a class="dropdown-item" href="#" v-on:click="setExampleContent('complex')">Complex example</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" v-on:click="setExampleContent('blank')">Blank</a>
        </div>
      </div>
      <br>
      <br>

      <div v-if=" validation.state=== 'invalid'">
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
          <p>The supplied Formscript has passed the validation checks in the <a
            href="https://github.com/wmfs/formscript/tree/master/packages/formscript-schema">formscript-schema</a>
            package!</p>
          <br>

          <vue-tabs>
            <v-tab title="UI">
              <br>
              <div class="alert alert-secondary" role="alert">
                This is a simple rendering of the Formscript provided above. Note this is only meant to be a basic
                illustration of typical web usage, clients are free to interpret Formscript and conjure a UI in any way
                they see fit!
              </div>
              <br>
              <formscript v-bind:content="dynamic.template"></formscript>
            </v-tab>
            <v-tab title="Data">
            </v-tab>
            <v-tab title="Template">
              <br>
              <div class="alert alert-secondary" role="alert">
                This is output of running the above Formscript through the <a class="alert-link"
                                                                              href="https://github.com/wmfs/formscript/tree/master/packages/formscript-to-template">formscript-to-template</a>
                package. Here we've configured things to output in a Vue.js style, but Angular and React templates can
                be
                generated too!
              </div>
              <pre><code class="template">{{dynamic.template}}</code></pre>
            </v-tab>
          </vue-tabs>
        </div>
      </div>

    </div>
</template>

<script>
  import Formscript from 'formscript-simple-vue'

  const examples = require('formscript-examples')
  const validator = require('formscript-schema').validateForm
  const templateConverter = require('formscript-to-template').convert

  export default {
    name: 'Playpen',
    components: {
      Formscript
    },
    methods: {

      setExampleContent: function (id) {
        this.$set(this.validation, 'state', 'notValidated')
        this.$set(this.validation, 'errors', [])
        this.$set(this.dynamic, 'template', '')
        this.$set(this, 'formscript', JSON.stringify(examples[id], null, 2))
        const e = document.getElementById('editor')
        e.scrollIntoView()
      },

      renderFormscript: function render () {

        this.$set(this.validation, 'state', 'notValidated')
        this.$set(this.validation, 'errors', [])
        this.$set(this.dynamic, 'template', '')

        this.$nextTick(function () {
          const parsed = JSON.parse(this.formscript)
          const result = validator(parsed)
          if (result.widgetsValid) {
            this.$set(this.validation, 'state', 'valid')
            this.$set(this.validation, 'errors', [])
            const output = templateConverter(parsed)
            this.$set(this.dynamic, 'template', output.template)
            this.$nextTick(function () {
              const e = document.getElementById('success')
              e.scrollIntoView()
            })
          } else {
            this.$set(this.validation, 'state', 'invalid')
            this.$set(this.validation, 'errors', result.errors)
            this.$set(this.dynamic, 'template', '')
          }
        })
      }
    },
    data () {
      const defaultFormscript = JSON.stringify(examples.simple, null, 2)
      return {
        example: defaultFormscript,
        formscript: defaultFormscript,
        validation: {
          state: 'notValidated',
          errors: []
        },
        dynamic: {}
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
