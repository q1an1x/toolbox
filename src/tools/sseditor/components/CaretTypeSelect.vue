<template>
  <q-select
    label="type"
    v-model="caretType"
    :dropdown-icon="matArrowDropDown"
    :options="['bar', 'block', 'underscore', 'auto']"
    @update:model-value="$emit('update', caretType)"
  />
</template>

<script>
import { matArrowDropDown } from "@quasar/extras/material-icons";

export default {
  name: "CaretTypeSelect",

  data() {
    return {
      caretType: null
    }
  },

  props: {
    type: {
      required: true,
      type: String
    }
  },

  mounted() {
    this.caretType = this.type
  },

  setup() {
    return {
      matArrowDropDown
    }
  }
}
</script>

<style scoped>

</style>
