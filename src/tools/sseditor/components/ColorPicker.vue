<template>
  <div>
    <q-btn
      round
      size="sm"
      class="q-mt-sm"
      :style="'background: ' + color"
    >
      <q-popup-proxy>
        <q-color v-model="caretColor" @update:model-value="$emit('update', caretColor)" />
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "ColorPicker",

  data() {
    return {
      caretColor: null
    }
  },

  mounted() {
    this.caretColor = this.color;
  },

  props: {
    color: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
