<template>
  <div>
    <component :is="uiTemplate"/>
  </div>
</template>
<script>
import dottie from 'dottie'
import { openURL, date } from 'quasar'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import VueSignature from 'vue-signature-pad'
import QMap from '@wmfs/quasar-map-mapbox'

const { formatDate } = date

export default {
  name: 'Cardscript',
  props: ['content'],
  data () {
    const that = this
    const content = this.content
    return {
      uiTemplate: {
        template: content.quasarTemplate,
        components: {
          videoPlayer,
          VueSignaturePad: VueSignature,
          QMap,
          ...QMap.components
        },
        validations: {
          data: content.validations
        },
        data () {
          return {
            data: content.data,
            lists: content.lists,
            internals: content.internals,
            invalidFields: {}
          }
        },
        methods: {
          formatDate,
          resizeSignatureModal ({ id, dataPath }) {
            this.$refs[`${id}SignaturePad`].resizeCanvas()
            const data = dottie.get(this, `${dataPath}.${id}`)
            this.$refs[`${id}SignaturePad`].fromDataURL(data)
          },
          showSignatureModal ({ id, dataPath }) {
            dottie.set(this, `${dataPath}.${id}OpenModal`, true)
          },
          clearSignature ({ id }) {
            this.$refs[`${id}SignaturePad`].clearSignature()
          },
          undoSignature ({ id }) {
            this.$refs[`${id}SignaturePad`].undoSignature()
          },
          saveSignature ({ id, dataPath }) {
            const { /* isEmpty, */ data } = this.$refs[`${id}SignaturePad`].saveSignature()
            dottie.set(this, `${dataPath}.${id}`, data)
            dottie.set(this, `${dataPath}.${id}OpenModal`, false)
          },
          parseTemplate (a) {
            return a
          },
          openURL,
          createNewCardList (cardListId) {
            this.internals.currentCardListData[cardListId] = this.internals.cardListDefaults[cardListId] || {}
            this.internals.dialogControl[cardListId] = true
          },
          pushCardListContent (cardListId) {
            const parentCardListId = this.internals.cardListParents[cardListId]
            const clone = JSON.parse(JSON.stringify(this.internals.currentCardListData[cardListId]))

            if (parentCardListId === null) {
              this.data[cardListId].push(clone)
            } else {
              this.internals.currentCardListData[parentCardListId][cardListId].push(clone)
            }
            this.internals.dialogControl[cardListId] = false
          },
          removeCardListContent (cardListId, index) {
            const parentCardListId = this.internals.cardListParents[cardListId]

            if (parentCardListId === null) {
              this.data[cardListId].splice(index, 1)
            } else {
              this.internals.currentCardListData[parentCardListId][cardListId].splice(index, 1)
            }
          },
          action (type, config) {
            that.$emit(type, config, this)
          }
        }
      }
    }
  }
}
</script>
<style>
  .video-js {
    width: 100%;
  }
</style>
