<template>
  <q-page>
    <q-layout-header>
      <q-toolbar>
        <img style="max-width: 32px;" src="~assets/tymly-light.svg"/>
        <q-toolbar-title>
          QScript Playpen
        </q-toolbar-title>
        <q-icon name="fab fa-github" size="18pt" class="cursor-pointer q-mr-md" @click.native="goGithub"/>
        <q-icon name="fab fa-twitter" size="18pt" class="cursor-pointer" @click.native="goTwitter"/>
      </q-toolbar>
    </q-layout-header>

    <div class="row" style="max-height: calc(100vh - 100px); min-height: calc(100vh - 100px);">
      <div class="col-xs-12 col-md-6">
        <brace
          fontsize="12px"
          theme="monokai"
          mode="json"
          codefolding="markbegin"
          softwrap="free"
          selectionstyle="text"
          highlightline
          style="height: 100%; width: 100%"
          @code-change="codeChange"
        />
      </div>
      <div class="col-xs-12 col-md-6">
        <div v-if="validation.state === 'invalid'">
          <q-alert
            v-for="(err, idx) in validation.errors"
            :key="idx"
            type="negative"
          >
            {{err}}
          </q-alert>
        </div>

        <div id="instructions" style="padding: 96px; text-align: justify;" v-if="validation.state === 'notValidated'">
          <div class="q-display-1 text-weight-light">
            Use the editor to write some QScript JSON, then hit the refresh button to turn it into a UI!
          </div>
          <div id="none-mobile">
            <hr class="q-my-lg"/>
            <div class="q-title text-weight-light q-mt-sm">
              Try one of these examples to get started quickly:
            </div>
            <q-btn-dropdown label="Examples" class="q-mr-sm  q-mt-sm" outline>
              <q-list link>
                <q-item
                  v-for="opt in exampleOpts"
                  :key="opt.value"
                  v-close-overlay
                  @click.native="setExampleContent(opt.value)"
                >
                  <q-item-main>
                    <q-item-tile label>{{opt.label}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>

        <div v-if="validation.state === 'valid'">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-tabs no-pane-border inverted class="q-pt-md" align="justify">
              <q-tab default slot="title" name="view-tab" label="view"></q-tab>
              <q-tab slot="title" name="model-tab" label="model"></q-tab>
              <q-tab slot="title" name="template-tab" label="template"></q-tab>
              <q-tab slot="title" name="info-tab" label="info"></q-tab>
              <q-tab-pane name="view-tab" class="tab-pane">
                <blockquote>
                  This is a simple rendering of the parsed QScript. Note that this is only meant to be a basic
                  illustration of typical web usage, your app is free to interpret QScript and conjure a UI in
                  any way
                  you see fit!
                </blockquote>

                <q-list
                  v-if="dynamicContent.toc.length > 0"
                  highlight
                  class="q-mt-md"
                >
                  <q-item
                    v-for="entry in dynamicContent.toc"
                    :key="entry.widgetId"
                    @click.native="tocClick(entry.widgetId)"
                    class="cursor-pointer"
                  >
                    <q-item-side left :icon="entry.tocIcon"/>
                    <q-item-main>{{entry.tocTitle}}</q-item-main>
                  </q-item>
                </q-list>

                <q-card class="q-mt-md q-mb-xl">
                  <q-card-main>
                    <q-script :content="dynamicContent" @OpenURL="onOpenURL" @Submit="onSubmit"
                                @ShowView="onShowView"/>
                  </q-card-main>
                </q-card>

              </q-tab-pane>
              <q-tab-pane name="model-tab" class="tab-pane">
                <blockquote>
                  This is the underlying data model for the view (default values were inferred from the QScript
                  using the
                  <a href="https://github.com/wmfs/qscript/tree/master/packages/qscript-extract-defaults">qscript-extract-defaults</a>
                  package).
                  Be sure to check back here as you change input fields to see the model change!
                </blockquote>

                <q-input
                  type="textarea"
                  readonly
                  v-bind:value="dynamicContent.data | pretty"
                  :max-height="300"
                  rows="10"
                  class="q-mt-md q-pa-sm bg-dark code"
                  dark
                />
              </q-tab-pane>
              <q-tab-pane name="template-tab" class="tab-pane">
                <blockquote>
                  The content below has been produced using the <a
                  href="https://github.com/wmfs/qscript/tree/master/packages/qscript-to-quasar">qscript-to-quasar</a>
                  and
                  <a href="https://github.com/wmfs/qscript/tree/master/packages/qscript-extract-lists">qscript-extract-lists</a>
                  packages. Here we've configured things to output in a Vue.js style, but Angular and React
                  templates
                  can
                  be generated too!
                </blockquote>

                <div class="q-display-1 q-my-md">Quasar Template</div>
                <q-input
                  type="textarea"
                  readonly
                  v-bind:value="dynamicContent.quasarTemplate"
                  :max-height="300"
                  rows="10"
                  class="q-mt-md q-pa-sm bg-dark code"
                  dark
                />

                <div class="q-display-1 q-my-md">Lists</div>
                <q-input
                  type="textarea"
                  readonly
                  v-bind:value="dynamicContent.lists | pretty"
                  :max-height="300"
                  rows="10"
                  class="q-mt-md q-pa-sm bg-dark code"
                  dark
                />
              </q-tab-pane>
              <q-tab-pane name="info-tab" class="tab-pane">
                <div class="q-display-1 q-my-md">Performance</div>
                <p>
                  This playpen is working with raw QScript (parsing, validating and transforming).
                  Most apps wouldn't need to do that kind of heavy lifting in the client.
                  As such, the rendering times inside the playpen are higher than usual... this is where all the
                  time just went:
                </p>
                <q-list highlight>
                  <q-item
                    v-for="(time, idx) in dynamicContent.times"
                    :key="idx"
                  >
                    <q-item-main :label="time.label"/>
                    <q-item-side right>
                      <q-item-tile>{{time.duration}}ms</q-item-tile>
                      <q-item-tile>{{time.percentage}}%</q-item-tile>
                    </q-item-side>
                  </q-item>
                  <q-item-separator/>
                  <q-item>
                    <q-item-main label="Total"/>
                    <q-item-side right>
                      <q-item-tile>{{dynamicContent.totalTime}}ms</q-item-tile>
                    </q-item-side>
                  </q-item>
                </q-list>

                <div class="q-display-1 q-my-md">Internals</div>
                <p>
                  Here are some of the internal workings (for managing dialog states and sub-views especially)
                </p>
                <q-input
                  type="textarea"
                  readonly
                  v-bind:value="dynamicContent.internals | pretty"
                  :max-height="300"
                  rows="10"
                  class="q-mt-md q-pa-sm bg-dark code"
                  dark
                />
              </q-tab-pane>
            </q-tabs>
          </transition>
        </div>
      </div>
    </div>

    <q-layout-footer>
      <q-toolbar>
        <div class="col">
          <q-btn-dropdown label="Examples" class="q-mr-sm" outline text-color="white">
            <q-list link>
              <q-item
                v-for="opt in exampleOpts"
                :key="opt.value"
                v-close-overlay
                @click.native="setExampleContent(opt.value)"
              >
                <q-item-main>
                  <q-item-tile label>{{opt.label}}</q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <div class="col footer-text text-right text-weight-thin">Built with ♡ at West Midlands Fire Service</div>
      </q-toolbar>
    </q-layout-footer>

    <div style="position: fixed; bottom: 18px; right: 18px; text-align: right;">
      <q-btn round color="primary" icon="clear" size="lg" style="bottom: 50px; margin-right: 10px;" @click="clear">
        <q-tooltip>Clear</q-tooltip>
      </q-btn>
      <q-btn round color="positive" icon="refresh" size="lg" style="bottom: 50px" @click="renderQScript">
        <q-tooltip>Refresh</q-tooltip>
      </q-btn>
    </div>
  </q-page>
</template>

<style>
  .code {
    font-family: monospace, monospace;
    font-size: 1em;
    background-color: #272822 !important;
  }

  .tab-pane {
    height: 84vh;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #272822;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media only screen and (max-width: 434px) {
    #none-mobile {
      display: none;
    }
  }

  @media only screen and (max-width: 767px) {
    #vue-bulma-editor {
      height: 300px !important;
    }

    #instructions {
      padding: 24px !important;
      text-align: initial !important;
    }
  }

  @media only screen and (max-width: 593px) {
    .footer-text {
      font-size: 12px;
    }
  }
</style>

<script>
  import { openURL } from 'quasar'
  import QScript from './../components/QScript'
  import Brace from 'vue-bulma-brace'
  import * as brace from 'brace'
  import * as validators from 'vuelidate/lib/validators'

  const quasarConverter = require('qscript-to-quasar')
  const extractDefaults = require('qscript-extract-defaults')
  const extractToc = require('qscript-table-of-contents')
  const extractLists = require('qscript-extract-lists')
  const sdk = require('qscript-vue-sdk').default
  const examples = require('qscript-examples')
  const parser = require('qscript-parser')
  const validator = require('qscript-schema').validateForm
  const vuelidateConverter = require('qscript-to-vuelidate')

  export default {
    name: 'PageIndex',
    components: {
      QScript,
      Brace
    },
    data: function () {
      return {
        dynamicContent: getEmptyDynamicContent(),
        validation: {
          state: 'notValidated',
          errors: []
        },
        qscript: JSON.stringify(examples['blank'], null, 2),
        exampleOpts: [
          {label: 'Complex example', value: 'complex'},
          {label: 'Expression example', value: 'expression'},
          {label: 'Sub-view example', value: 'subView'},
          {label: 'Simple example', value: 'simple'},
          {label: 'Basic problems example', value: 'simpleFormWithBasicProblems'},
          {label: 'Blank example', value: 'blank'},
          {label: 'Kitchen sink example', value: 'kitchenSink'}
        ]
      }
    },
    filters: {
      pretty: json => JSON.stringify(json, null, 2)
    },
    mounted () {
      this.editor = brace.edit('vue-bulma-editor')
      this.editor.session.setValue(this.qscript)
    },
    methods: {
      onOpenURL (payload) {
        openURL(payload.config.url)
      },
      onShowView (payload) {
        console.log('show view', payload)
        this.$q.notify({
          message: 'Going to the other view.',
          type: 'positive',
          position: 'top'
        })
      },
      onSubmit (payload, that) {
        console.log('submit', payload)
        that.$v.data.$touch()
        if (that.$v.data.$error) {
          this.$q.notify({
            message: 'Please review fields again.',
            type: 'warning',
            position: 'top'
          })
        } else {
          this.$q.notify({
            message: 'Your data has been submitted.',
            type: 'positive',
            position: 'top'
          })
        }
      },
      goGithub () {
        openURL('https://github.com/wmfs/qscript')
      },
      goTwitter () {
        openURL('https://twitter.com/tymlyjs')
      },
      codeChange (e) {
        this.qscript = e
      },
      tocClick (elementIdToScrollTo) {
        const e = document.getElementById(elementIdToScrollTo)
        e.scrollIntoView()
      },
      clear () {
        this.validation.state = 'notValidated'
        this.validation.errors = []
        this.dynamicContent = getEmptyDynamicContent()
        this.qscript = JSON.stringify(examples['blank'], null, 2)
        this.editor.session.setValue(this.qscript)
      },
      setExampleContent (val) {
        this.qscript = JSON.stringify(examples[val], null, 2)
        this.editor.session.setValue(this.qscript)
        this.renderQScript()
      },
      renderQScript () {
        this.$q.loading.show()

        setTimeout(() => {
          this.validation.state = 'notValidated'
          this.validation.errors = []

          this.$nextTick(() => {
            try {
              if (this.qscript.trim().length === 0) {
                throw new Error('You must enter some data.')
              }

              const stopwatch = new Stopwatch()
              const output = processQScript(this.qscript, stopwatch)

              this.dynamicContent.quasarTemplate = output.quasarOutput.template
              this.dynamicContent.data = output.defaultValues.rootView
              this.dynamicContent.internals = output.defaultInternals
              this.dynamicContent.lists = output.lists
              this.dynamicContent.toc = output.toc
              this.dynamicContent.validations = output.validations
              console.log('Validations', output.validations)

              this.validation.state = 'valid'
              this.validation.errors = []

              this.$nextTick(() => {
                this.$q.loading.hide()
                stopwatch.addTime('Finished')
                this.dynamicContent.times = stopwatch.getResults()
                this.dynamicContent.totalTime = stopwatch.getTotal()
              })
            } catch (e) {
              this.dynamicContent = getEmptyDynamicContent()
              this.validation.state = 'invalid'
              this.validation.errors.push(e.message)
              this.$q.loading.hide()
            }
          })
        }, 20)
      }
    }
  }

  function getEmptyDynamicContent () {
    return {
      quasarTemplate: '',
      data: {},
      internals: {},
      lists: {},
      toc: [],
      times: {},
      totalTime: 0,
      validations: {}
    }
  }

  function processQScript (qscriptStr, stopwatch) {
    const result = {}
    stopwatch.addTime('Parse string into object')
    const parserResult = parser(qscriptStr)
    if (parserResult.parsed) {
      const qscript = parserResult.parsed
      if (Object.keys(qscript).length === 0) {
        throw new Error('Cannot convert an empty object.')
      }
      stopwatch.addTime('Validate object')
      result.validatorOutput = validator(qscript)
      if (result.validatorOutput.widgetsValid) {
        stopwatch.addTime('Extract default values')
        result.defaultValues = extractDefaults(qscript)
        stopwatch.addTime('Extract TOC')
        result.toc = extractToc(qscript)
        stopwatch.addTime('Extract lists')
        result.lists = extractLists(qscript)
        stopwatch.addTime('Calculate starting internals')
        result.defaultInternals = sdk.getDefaultInternals.default(qscript)
        result.defaultInternals.subViewDefaults = result.defaultValues.subViews
        stopwatch.addTime('Generating Vuelidate validations')
        result.validations = vuelidateConverter(qscript, validators)
        stopwatch.addTime('Generate template')
        result.quasarOutput = quasarConverter(qscript)
      } else {
        throw new Error(`${result.validatorOutput.errors[0].property} ${result.validatorOutput.errors[0].message}`)
      }
    } else {
      throw new Error(parserResult.errors[0].message)
    }
    return result
  }

  class Stopwatch {
    constructor () {
      this.times = [{
        label: 'init',
        milliseconds: Date.now()
      }]
    }

    addTime (label) {
      const previousTime = this.times[this.times.length - 1]
      const n = Date.now()
      previousTime.duration = n - previousTime.milliseconds
      this.times.push({
        label: label,
        milliseconds: n
      })
    }

    getResults () {
      const trimmed = this.times.slice(1, -1)
      let total = 0
      trimmed.forEach(time => { total += time.duration })
      trimmed.forEach(time => { time.percentage = ((time.duration / total) * 100).toFixed(1) })
      return trimmed
    }

    getTotal () {
      return this.times
        .map(time => time.duration || 0)
        .reduce((acc, time) => acc + time)
    }
  }
</script>
