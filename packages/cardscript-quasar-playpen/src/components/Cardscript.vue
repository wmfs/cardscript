<template>
  <div>
    <component :is="uiTemplate"/>
  </div>
</template>
<script>
import dottie from 'dottie'
import { openURL } from 'quasar'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import VueSignature from 'vue-signature-pad'

export default {
  name: 'Cardscript',
  props: ['content'],
  data () {
    const that = this
    const content = this.content
    return {
      uiTemplate: {
        template: content.quasarTemplate,
        components: { videoPlayer, VueSignaturePad: VueSignature },
        validations: {
          data: content.validations
        },
        data () {
          return {
            data: content.data,
            lists: content.lists,
            internals: content.internals
          }
        },
        methods: {
          resize ({ id }) {
            this.$refs[`${id}SignaturePad`].resizeCanvas()
          },
          showSignatureModal ({ openId }) {
            dottie.set(this, openId, true)
          },
          undoSign ({ id }) {
            this.$refs[`${id}SignaturePad`].undoSignature()
          },
          saveSign ({ id, dataPath }) {
            const { isEmpty, data } = this.$refs[`${id}SignaturePad`].saveSignature()
            console.log('Is empty?', isEmpty)
            console.log('Data:', data)
            dottie.set(this, `${dataPath}.${id}`, data)
            // dottie.set(this, `${dataPath}.${id}OpenModal`, false)
          },
          openURL,
          createNewCardView (cardViewId) {
            this.internals.currentCardViewData[cardViewId] = this.internals.cardViewDefaults[cardViewId] || {}
            this.internals.dialogControl[cardViewId] = true
          },
          pushCardViewContent (cardViewId) {
            const parentCardViewId = this.internals.cardViewParents[cardViewId]
            const clone = JSON.parse(JSON.stringify(this.internals.currentCardViewData[cardViewId]))

            if (parentCardViewId === null) {
              this.data[cardViewId].push(clone)
            } else {
              this.internals.currentCardViewData[parentCardViewId][cardViewId].push(clone)
            }
            this.internals.dialogControl[cardViewId] = false
          },
          removeCardViewContent (cardViewId, index) {
            const parentCardViewId = this.internals.cardViewParents[cardViewId]

            if (parentCardViewId === null) {
              this.data[cardViewId].splice(index, 1)
            } else {
              this.internals.currentCardViewData[parentCardViewId][cardViewId].splice(index, 1)
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
