<template>
  <q-page>
    <q-header>
      <q-toolbar>
        <img style="max-width: 32px;" src="~assets/tymly-light.svg"/>
        <q-toolbar-title>
          Cardscript Playpen
        </q-toolbar-title>
        <q-icon name="fab fa-github" size="18pt" class="cursor-pointer q-mr-md" @click.native="goGithub"/>
        <q-icon name="fab fa-twitter" size="18pt" class="cursor-pointer" @click.native="goTwitter"/>
      </q-toolbar>
    </q-header>

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
          <q-banner
            v-for="(err, idx) in validation.errors"
            :key="idx"
            class="bg-negative"
          >
            {{err}}
          </q-banner>
        </div>

        <div id="instructions" style="padding: 96px; text-align: justify;" v-if="validation.state === 'notValidated'">
          <div class="text-h4 text-weight-light">
            Use the editor to write some Cardscript JSON, then hit the refresh button to turn it into a UI!
          </div>
          <div id="none-mobile">
            <hr class="q-my-lg"/>
            <div class="text-h6 text-weight-light q-mt-sm">
              Try one of these examples to get started quickly:
            </div>
            <q-btn-dropdown label="Examples" class="q-mr-sm  q-mt-sm" outline>
              <q-list link>
                <q-item
                  v-for="opt in exampleOpts"
                  :key="opt.value"
                  v-close-popup
                  @click.native="setExampleContent(opt.value)"
                >
                  <q-item-section>
                    <q-item-label>{{opt.label}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>

        <div v-if="validation.state === 'valid'">
          <q-tabs
            v-model="tabIndex"
            align="justify"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
            dense
          >
            <q-tab name="card-tab" label="Card"/>
            <q-tab name="model-tab" label="Model"/>
            <q-tab name="template-tab" label="Template"/>
            <q-tab name="info-tab" label="Info"/>
          </q-tabs>

          <q-tab-panels v-model="tabIndex">
            <q-tab-panel name="card-tab">
              <div class="blockquote">
                This is a simple rendering of the parsed Cardscript. Note that this is only meant to be a basic
                illustration of typical web usage, your app is free to interpret Cardscript and conjure a UI in
                any way
                you see fit!
              </div>

              <q-list
                v-if="dynamicContent.toc.length > 0"
                highlight
                class="q-mt-md"
              >
                <q-item
                  v-for="entry in dynamicContent.toc"
                  :key="entry.elementId"
                  @click.native="tocClick(entry.elementId)"
                  class="cursor-pointer"
                >
                  <q-item-section side left>
                    <q-icon :name="entry.tocIcon"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{entry.tocTitle}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-card class="q-mt-md q-mb-xl">
                <q-card-section>
                  <cardscript
                    :content="dynamicContent"
                    @OpenURL="onOpenURL"
                    @Submit="onSubmit"
                    @ShowCard="onShowCard"
                    @InputAddress="onInputAddress"
                    @InputApiLookup="onInputApiLookup"
                  />
                </q-card-section>
              </q-card>
            </q-tab-panel>
            <q-tab-panel name="model-tab">
              <div class="blockquote">
                This is the underlying data model for the card (default values were inferred from the Cardscript
                using the
                <a href="https://github.com/wmfs/cardscript-extract-defaults">cardscript-extract-defaults</a>
                package).
                Be sure to check back here as you change input fields to see the model change!
              </div>

              <q-input
                type="textarea"
                readonly
                v-bind:value="dynamicContent.data | pretty"
                :max-height="300"
                rows="10"
                class="q-mt-md q-pa-sm bg-dark code"
                dark
              />
            </q-tab-panel>
            <q-tab-panel name="template-tab">
              <div class="blockquote">
                The content below has been produced using the <a
                href="https://github.com/wmfs/cardscript-to-quasar">cardscript-to-quasar</a>
                and
                <a href="https://github.com/wmfs/cardscript-extract-lists">cardscript-extract-lists</a>
                packages. Here we've configured things to output in a Vue.js style, but Angular and React
                templates
                can
                be generated too!
              </div>

              <div class="text-h4 q-my-md">Quasar Template</div>
              <q-input
                type="textarea"
                readonly
                v-bind:value="dynamicContent.quasarTemplate"
                :max-height="300"
                rows="10"
                class="q-mt-md q-pa-sm bg-dark code"
                dark
              />

              <div class="text-h4 q-my-md">Lists</div>
              <q-input
                type="textarea"
                readonly
                v-bind:value="dynamicContent.lists | pretty"
                :max-height="300"
                rows="10"
                class="q-mt-md q-pa-sm bg-dark code"
                dark
              />
            </q-tab-panel>
            <q-tab-panel name="info-tab">
              <div class="text-h4 q-my-md">Performance</div>
              <p>
                This playpen is working with raw Cardscript (parsing, validating and transforming).
                Most apps wouldn't need to do that kind of heavy lifting in the client.
                As such, the rendering times inside the playpen are higher than usual... this is where all the
                time just went:
              </p>
              <q-list bordered>
                <q-item
                  v-for="(time, idx) in dynamicContent.times"
                  :key="idx"
                >
                  <q-item-section>
                    <q-item-label>
                      {{time.label}}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side right>
                    <q-item-label>{{time.duration}}ms</q-item-label>
                    <q-item-label>{{time.percentage}}%</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Total
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side right>
                    <q-item-label>{{dynamicContent.totalTime}}ms</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="text-h4 q-my-md">Internals</div>
              <p>
                Here are some of the internal workings (for managing dialog states and card lists especially)
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
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>

    <q-footer>
      <q-toolbar>
        <div class="col">
          <q-btn-dropdown label="Examples" class="q-mr-sm" outline text-color="white">
            <q-list link>
              <q-item
                v-for="opt in exampleOpts"
                :key="opt.value"
                v-close-popup
                @click.native="setExampleContent(opt.value)"
              >
                <q-item-section>
                  <q-item-label>{{opt.label}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <div class="col footer-text text-right text-weight-thin">Built with ♡ at West Midlands Fire Service</div>
      </q-toolbar>
    </q-footer>

    <div style="position: fixed; bottom: 18px; right: 18px; text-align: right;">
      <q-btn round color="primary" icon="clear" size="lg" style="bottom: 50px; margin-right: 10px;" @click="clear">
        <q-tooltip>Clear</q-tooltip>
      </q-btn>
      <q-btn round color="positive" icon="refresh" size="lg" style="bottom: 50px" @click="renderCardscript">
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

  .q-tab-panel {
    height: 84vh !important;
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
  import Cardscript from './../components/Cardscript'
  import Brace from 'vue-bulma-brace'
  import * as brace from 'brace'
  import * as validators from 'vuelidate/lib/validators'
  import dottie from 'dottie'

  const quasarConverter = require('@wmfs/cardscript-to-quasar')
  const extractDefaults = require('@wmfs/cardscript-extract-defaults')
  const extractToc = require('@wmfs/cardscript-table-of-contents')
  const extractLists = require('@wmfs/cardscript-extract-lists')
  const sdk = require('@wmfs/cardscript-vue-sdk')
  const examples = require('@wmfs/cardscript-examples')
  const parser = require('@wmfs/cardscript-parser')
  const validator = require('@wmfs/cardscript-schema').validateForm
  const vuelidateConverter = require('@wmfs/cardscript-to-vuelidate')

  export default {
    name: 'PageIndex',
    components: {
      Cardscript,
      Brace
    },
    data: function () {
      return {
        tabIndex: 'card-tab',
        dynamicContent: getEmptyDynamicContent(),
        validation: {
          state: 'notValidated',
          errors: []
        },
        cardscript: JSON.stringify(examples['blank'], null, 2),
        exampleOpts: [
          {label: 'Complex example', value: 'complex'},
          {label: 'Expression example', value: 'expression'},
          {label: 'Card List example', value: 'cardList'},
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
      this.editor.session.setValue(this.cardscript)
    },
    methods: {
      onInputApiLookup (payload, that) {
        console.log('onInputApiLookup', payload)
      },
      onInputAddress (payload, that) {
        const query = dottie.get(that, `${payload.dataPath}.${payload.id}SearchFld`)
        if (query && query.trim().length > 0) {
          dottie.set(that, `${payload.dataPath}.${payload.id}SearchResults`, [
            {label: '1 Red Road ', value: '1'},
            {label: '2 Red Road ', value: '2'},
            {label: '3 Red Road ', value: '3'}
          ])
        }
      },
      onOpenURL (payload) {
        openURL(payload.config.url)
      },
      onShowCard (payload) {
        console.log('show card', payload)
        this.$q.notify({
          message: 'Going to the other card.',
          type: 'positive',
          position: 'top'
        })
      },
      onSubmit (payload, that) {
        console.log('submit', payload)
        // that.$v.data.$touch()
        // if (that.$v.data.$error) {
        //   this.$q.notify({
        //     message: 'Please review fields again.',
        //     type: 'warning',
        //     position: 'top'
        //   })
        // } else {
        //   this.$q.notify({
        //     message: 'Your data has been submitted.',
        //     type: 'positive',
        //     position: 'top'
        //   })
        // }
      },
      goGithub () {
        openURL('https://github.com/wmfs/cardscript')
      },
      goTwitter () {
        openURL('https://twitter.com/tymlyjs')
      },
      codeChange (e) {
        this.cardscript = e
      },
      tocClick (elementIdToScrollTo) {
        const e = document.getElementById(elementIdToScrollTo)
        e.scrollIntoView()
      },
      clear () {
        this.validation.state = 'notValidated'
        this.validation.errors = []
        this.dynamicContent = getEmptyDynamicContent()
        this.cardscript = JSON.stringify(examples['blank'], null, 2)
        this.editor.session.setValue(this.cardscript)
      },
      setExampleContent (val) {
        this.cardscript = JSON.stringify(examples[val], null, 2)
        this.editor.session.setValue(this.cardscript)
        this.renderCardscript()
      },
      renderCardscript () {
        this.tabIndex = 'card-tab'
        this.$q.loading.show()

        setTimeout(() => {
          this.validation.state = 'notValidated'
          this.validation.errors = []

          this.$nextTick(() => {
            try {
              if (this.cardscript.trim().length === 0) {
                throw new Error('You must enter some data.')
              }

              const stopwatch = new Stopwatch()
              const output = processCardscript(this.cardscript, stopwatch)

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

  function processCardscript (cardscriptStr, stopwatch) {
    const result = {}
    stopwatch.addTime('Parse string into object')
    const parserResult = parser(cardscriptStr)
    if (parserResult.parsed) {
      const cardscript = parserResult.parsed
      if (Object.keys(cardscript).length === 0) {
        throw new Error('Cannot convert an empty object.')
      }
      stopwatch.addTime('Validate object')
      result.validatorOutput = validator(cardscript)
      if (result.validatorOutput.elementsValid) {
        stopwatch.addTime('Extract default values')
        result.defaultValues = extractDefaults(cardscript)
        stopwatch.addTime('Extract TOC')
        result.toc = extractToc(cardscript)
        stopwatch.addTime('Extract lists')
        result.lists = extractLists(cardscript)
        stopwatch.addTime('Calculate starting internals')
        result.defaultInternals = sdk.getDefaultInternals(cardscript)
        result.defaultInternals.cardListDefaults = result.defaultValues.cardLists
        stopwatch.addTime('Generating Vuelidate validations')
        result.validations = vuelidateConverter(cardscript, validators)
        stopwatch.addTime('Generate template')
        result.quasarOutput = quasarConverter(cardscript)
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
