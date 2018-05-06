<template>
    <div>
    <component :is="uiTemplate"></component>
    </div>
</template>
<script>
import AppAddress from './widgets/address'
import AppApiLookup from './widgets/api-lookup'
import AppCheckboxList from './widgets/checkbox-list'
import AppCurrency from './widgets/currency'
import AppDate from './widgets/date'
import AppDateTime from './widgets/date-time'
import AppEndSet from './widgets/end-set'
import AppEndSubView from './widgets/end-sub-view'
import AppFileUpload from './widgets/file-upload'
import AppHeader from './widgets/header'
import AppHeading from './widgets/heading'
import AppImage from './widgets/image'
import AppMap from './widgets/map'
import AppNumber from './widgets/number'
import AppQuestionnaire from './widgets/questionnaire'
import AppQuestionnaireOption from './widgets/questionnaire-option'
import AppRadio from './widgets/radio'
import AppRichtext from './widgets/richtext'
import AppSelect from './widgets/select'
import AppSet from './widgets/set'
import AppSignature from './widgets/signature'
import AppSlider from './widgets/slider'
import AppStickyNote from './widgets/sticky-note'
import AppSubView from './widgets/sub-view'
import AppSwitch from './widgets/switch'
import AppText from './widgets/text'
import AppTextarea from './widgets/textarea'
import AppTime from './widgets/time'

export default {
  name: 'Viewscript',
  props: ['content'],
  data () {
    const _this = this
    return {
      uiTemplate: {
        template: this.content.template,
        components: {
          AppAddress,
          AppApiLookup,
          AppCheckboxList,
          AppCurrency,
          AppDate,
          AppDateTime,
          AppEndSet,
          AppEndSubView,
          AppFileUpload,
          AppHeading,
          AppHeader,
          AppImage,
          AppMap,
          AppNumber,
          AppQuestionnaire,
          AppQuestionnaireOption,
          AppRadio,
          AppRichtext,
          AppSelect,
          AppSet,
          AppSignature,
          AppSlider,
          AppStickyNote,
          AppSubView,
          AppSwitch,
          AppText,
          AppTextarea,
          AppTime
        },
        data: function () {
          return {
            data: _this.content.data,
            lists: _this.content.lists
          }
        }
      }
    }
  }
}
</script>