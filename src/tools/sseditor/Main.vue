<template>
  <div class="fullscreen app">
    <menu-bar :class="'bar ' + menuBarClass" @copy="copyAndNotify" @showSettings="showSettings = true" />

    <settings-dialog v-if="showSettings" @close="showSettings = false" />

    <q-input
      autogrow
      autofocus
      borderless
      v-model="input"
      class="input"
      ref="input"
      input-style="line-height: 2rem"
      @update:model-value="update"
      @keydown.delete="mode = 0"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import MenuBar from "src/tools/sseditor/components/MenuBar";
import SettingsDialog from "src/tools/sseditor/components/SettingsDialog";
import { useMeta } from "quasar";
export default {
  name: "sseditorMain",
  components: { SettingsDialog, MenuBar },
  data() {
    return {
      input: '',
      previous: '',
      mode: 0,
      dismissIndicator: () => {},
      showSettings: false,
      autoCopy: false
    }
  },

  mounted() {
    useMeta({
      title: 'sseditor'
    });

    this.autoCopy = this.$utils.getPreference('autoCopy', false);
  },

  computed: {
    placeholder() {
      return this.$utils.getPreference('hideHint', false) ? '' : 'hint: type \'^2 H_2 O\' for \'²H₂O\'';
    },

    menuBarClass() {
      switch (this.$utils.getPreference('menuBarPos', 'bottom right')) {
        case 'top left':
          return 'topLeft';
        case 'top right':
          return 'topRight';
        case 'bottom left':
          return 'bottomLeft';
        default:
          return 'bottomRight';
      }
    }
  },

  watch: {
    mode(value) {
      this.dismissIndicator();
      switch (value) {
        case 1:
          this.dismissIndicator = this.$q.notify({
            color: 'info',
            message: 'entering subscripts',
            timeout: 0
          });
          return;
        case 2:
          this.dismissIndicator = this.$q.notify({
            color: 'warning',
            message: 'entering superscripts',
            timeout: 0
          });
          return;
      }
    }
  },

  methods: {
    update() {
      if (this.autoCopy) {
        this.copyToClipboard(this.input);
      }

      const char = this.input.replace(this.previous, '');

      if (char === '_') {
        this.$nextTick(() => {
          this.input = this.previous;
        });
        this.mode = 1;
        return;
      }
      if (char === '^') {
        this.$nextTick(() => {
          this.input = this.previous;
        });
        this.mode = 2;
        return;
      }
      if (this.mode === 1 || this.mode === 2) {
        if (char === " ") {
          this.$nextTick(() => {
            this.input = this.previous;
          });
          this.mode = 0;
          return;
        }

        this.input = this.previous;
        if (char === "\r\n" || char === "\n" || char === "\r") {
          this.mode = 0;
          return;
        }

        this.input += this.mode === 1 ? this.getSub(char) : this.getSuper(char);
      }

      this.previous = this.input;
    },

    copyToClipboard(text) {
      function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {}
        document.body.removeChild(textArea);
      }
      function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
          fallbackCopyTextToClipboard(text);
          return;
        }
        navigator.clipboard.writeText(text);
      }
      copyTextToClipboard(text);
    },

    copyAndNotify() {
      this.copyToClipboard(this.input);
      this.$q.notify({
        timeout: 2,
        message: 'Copied to clipboard.'
      });
    },

    getSuper(char) {
      return {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸',
        '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᶢ', 'h': 'ʰ', 'i': 'ⁱ',
        'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', /* q */ 'r': 'ʳ',
        's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ꟲ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ꟳ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ',
        'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ꟴ', 'R': 'ᴿ',
        'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ' // s, x, y, z does not have uppercase
      }[char] ?? char;
    },

    getSub(char) {
      return {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈',
        '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
        'a': 'ₐ',/* b, c, d */ 'e': 'ₑ', /* f, g */ 'h': 'ₕ', 'i': 'ᵢ',
        'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', /* q */ 'r': 'ᵣ',
        's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', /* w */ 'x': 'ₓ', /* y, z */ // subscript misses a lot of characters...
        // and no uppercase at all
        // todo: option to convert uppercase to lowercase subscripts
      }[char] ?? char;
    }
  },
}
</script>

<style scoped>
.input {
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  cursor: text !important;
  line-height: 122rem !important;
}
.app {
  cursor: text !important;
}
.bar {
  position: absolute;
  z-index: 5;
}
.topLeft {
  left: 25px;
  top: 15px;
}
.topRight {
  right: 25px;
  top: 15px;
}
.bottomRight {
  right: 25px;
  bottom: 15px;
}
.bottomLeft {
  left: 25px;
  bottom: 15px;
}
</style>
<style>
.q-notification {
  transition: 0.3s;
}
.input input::placeholder {
  color: gold !important;
}
</style>
