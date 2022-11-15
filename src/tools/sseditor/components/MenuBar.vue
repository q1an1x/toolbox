<template>
  <div class="q-gutter-x-sm">
    <q-btn round color="white" text-color="black" :icon="matCopyAll" @click="$emit('copy')" />
    <q-btn round color="white" text-color="black" :icon="matInfo" @click="showInfo" />
    <q-btn round color="white" text-color="black" :icon="matSettings" @click="showSettings" />
  </div>
</template>

<script>
import { matSettings, matInfo, matCopyAll } from "@quasar/extras/material-icons"

export default {
  name: "MenuBar",

  setup() {
    return {
      matSettings, matInfo, matCopyAll
    }
  },

  methods: {
    showInfo() {
      this.$q.dialog({
        title: 'usage',
        color: 'black',
        message: `caret(^) for superscripts<br/>
        underline(_) for subscripts<br/>
        space/delete for normal characters<br/>
        that is it...<br/><br/>
        example: to write ²H₂O, you type: ^2 H_2 O<br/><br/>
        note that this tool does it by converting characters to the superscript/subscript version of these characters(with different codes)
        and should work on most modern platforms regardless of programs/apps used, however, not all characters will display as intended and do not expect consistency<br/><br/>
        read: <a href="https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts" target="_blank">wikipedia: unicode_subscripts_and_superscripts</a>`,
        html: true
      });
    },
    showSettings() {
      this.$q.dialog({
        title: 'settings',
        color: 'black',
        options: {
          type: 'checkbox',
          model: [],
          items: [
            { label: 'auto-copy', value: 'autoCopy' }
          ]
        }
      });
    }
  }
}
</script>
<style>
a {
  color: black;
}
</style>
