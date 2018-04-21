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

      <button type="button" class="btn btn-primary btn-lg" v-on:click="renderFormscript()">Parse!</button>

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

      <div v-if="showSpinner">
        <img src="../assets/spinner.gif"/>
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
            <v-tab title="View">
              <br>
              <div class="alert alert-secondary" role="alert">
                This is a simple rendering of the parsed Formscript. Note that this is only meant to be a basic
                illustration of typical web usage, your app is free to interpret Formscript and conjure a UI in any way
                you see fit!
              </div>
              <br>

              <div class="card">
                <div class="card-body">
                  <formscript v-bind:content="dynamicContent"></formscript>
                </div>
              </div>

            </v-tab>
            <v-tab title="Model">
              <br>
              <div class="alert alert-secondary" role="alert">
                This is the underlying data model for the GUI (default values were inferred from the Fromscript using the
                <a class="alert-link" href="https://github.com/wmfs/formscript/tree/master/packages/formscript-parser">formscript-parser</a> package.
                Be sure to check back here as you change input fields to see the model change!
              </div>
              <pre><code class="template">{{dynamicContent.data}}</code></pre>
              <br>
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
              <pre><code class="template">{{dynamicContent.template}}</code></pre>
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
  const parser = require('formscript-parser').parse

  function parseFormscript(component) {
    return new Promise((resolve, reject) => {
      component.$nextTick(function () {
        console.log('START JSON.parse() ' + Date.now())
        const formscript = JSON.parse(component.formscript)
        console.log('VALIDATING ' + Date.now())
        const result = validator(formscript)
        if (result.widgetsValid) {
          console.log('PARSING ' + Date.now())
          const parsed = parser(formscript)
          console.log('BUILDING TEMPLATE ' + Date.now())
          const output = templateConverter(formscript)
          console.log('FINISHING ' + Date.now())
          component.$nextTick(function () {
            component.$set(this.validation, 'errors', [])
            component.$set(this.dynamicContent, 'template', output.template)
            component.$set(this.dynamicContent, 'data', parsed.defaultValues)
            this.showSpinner = false
            resolve()
          })
        } else {
          component.$set(component.validation, 'state', 'invalid')
          component.$set(component.validation, 'errors', result.errors)
          component.$set(component.dynamicContent, 'template', '')
          component.$set(component.dynamicContent, 'data', {})
          this.showSpinner = false
          resolve()
        }
      })
    })
  }

  export default {
    name: 'Playpen',
    components: {
      Formscript
    },
    methods: {

      setExampleContent: function (id) {
        this.$set(this.validation, 'state', 'notValidated')
        this.$set(this.validation, 'errors', [])
        this.$set(this.dynamicContent, 'template', '')
        this.$set(this, 'formscript', JSON.stringify(examples[id], null, 2))
        const e = document.getElementById('editor')
        e.scrollIntoView()
      },

      renderFormscript: function render () {
        console.log('START ' + Date.now())
        this.showSpinner = true
        this.$set(this.validation, 'state', 'notValidated')
        this.$set(this.validation, 'errors', [])
        this.$set(this.dynamicContent, 'template', '')
        this.$set(this.dynamicContent, 'data', {})

        this.$nextTick(function() {
          parseFormscript(this).then((response) => {
            this.$set(this.validation, 'state', 'valid')
            this.$nextTick(function () {
              this.showSpinner = false
              const e = document.getElementById('success')
              e.scrollIntoView()
              console.log('FINISHED')
            })
          })
        })
      }
    },
    data () {
      const defaultFormscript = JSON.stringify(examples.simple, null, 2)
      return {
        showSpinner: false,
        example: defaultFormscript,
        formscript: defaultFormscript,
        validation: {
          state: 'notValidated',
          errors: []
        },
        dynamicContent: {}
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
