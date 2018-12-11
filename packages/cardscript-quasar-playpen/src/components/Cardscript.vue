<template>
  <div>
    <component :is="uiTemplate"/>
  </div>
</template>
<script>
import { openURL } from 'quasar'

export default {
  name: 'Cardscript',
  props: ['content'],
  data () {
    const that = this
    const content = this.content
    return {
      uiTemplate: {
        template: content.quasarTemplate,
        components: {},
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
          openURL,
          createNewCardView (cardViewId) {
            const cardViewDefaultValues = JSON.parse(JSON.stringify(this.internals.cardViewDefaults[cardViewId]))
            this.internals.currentCardViewData[cardViewId] = cardViewDefaultValues
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
