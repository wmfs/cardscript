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
import AppEndSubForm from './widgets/end-sub-form'
import AppFileUpload from './widgets/file-upload'
import AppHeader from './widgets/header'
import AppImage from './widgets/image'
import AppMap from './widgets/map'
import AppNumber from './widgets/number'
import AppQuestionnaire from './widgets/questionnaire'
import AppRadio from './widgets/radio'
import AppRichtext from './widgets/richtext'
import AppSelect from './widgets/select'
import AppSet from './widgets/set'
import AppSignature from './widgets/signature'
import AppSlider from './widgets/slider'
import AppStickyNote from './widgets/sticky-note'
import AppSubForm from './widgets/sub-form'
import AppSwitch from './widgets/switch'
import AppText from './widgets/text'
import AppTextarea from './widgets/textarea'
import AppTime from './widgets/time'

export default {
  name: 'Formscript',
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
          AppEndSubForm,
          AppFileUpload,
          AppHeader,
          AppImage,
          AppMap,
          AppNumber,
          AppQuestionnaire,
          AppRadio,
          AppRichtext,
          AppSelect,
          AppSet,
          AppSignature,
          AppSlider,
          AppStickyNote,
          AppSubForm,
          AppSwitch,
          AppText,
          AppTextarea,
          AppTime
        },
        data: function () {
          return {
            data: _this.content.data
          }
        }
      }
    }
  }
}
</script>