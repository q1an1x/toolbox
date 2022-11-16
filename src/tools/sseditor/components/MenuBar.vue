<template>
  <div class="q-gutter-x-sm">
    <q-btn round color="white" text-color="black" :icon="matCopyAll" @click="$emit('copy')" />
    <q-btn round color="white" text-color="black" :icon="matInfo" @click="showInfo" />
    <q-btn round color="white" text-color="black" :icon="matSettings" @click="$emit('showSettings')" />
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
        title: 'info',
        color: 'black',
        ok: {
          label: 'great!',
          noCaps: true,
          flat: true
        },
        message: `
        sseditor is a text editor that helps you with entering unicode superscripts/subscripts.<br/>
        check out some other stuff i made: <a href="https://toolbox.tpwhky.com" target="_blank">https://toolbox.tpwhky.com</a><br/><br/>
        caret(^) for superscripts<br/>
        underline(_) for subscripts<br/>
        space/delete for normal characters<br/>
        that is it...<br/><br/>
        example: to write ²H₂O, you type: ^2 H_2 O<br/><br/>
        note that this tool does it by converting characters to the superscript/subscript version of these characters(with different codes)
        and should work on most modern platforms regardless of programs/apps used, however, some characters might not be displayed as intended depending on your device, and you should not expect consistency<br/><br/>
        read: <a href="https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts" target="_blank">wikipedia: unicode_subscripts_and_superscripts</a>`,
        html: true
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
