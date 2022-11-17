<template>
  <q-dialog v-model="visible" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">settings</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1">font size</div>
        <q-slider
          :min="0.5"
          :max="3"
          :step="0.1"
          label-always
          color="black"
          v-model="preferences.fontSize"
          :label-value="fontSizeLabel"
          markers
        />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div>
          <q-checkbox
            color="black"
            v-model="preferences.hideHint"
            label="hide hint placeholder"
          />
        </div>
        <div>
          <q-checkbox
            color="black"
            v-model="preferences.autoCopy"
            label="auto-copy to clipboard while editing"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-select
          label="menu bar position"
          v-model="preferences.menuBarPos"
          :dropdown-icon="matArrowDropDown"
          :options="['top left', 'top right', 'bottom left', 'bottom right']"
        />
      </q-card-section>

      <q-card-section>
        note: in order for the changes to take effect, you may need to refresh the page after saving.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="save" color="black" @click="save" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { matArrowDropDown } from '@quasar/extras/material-icons';

export default {
  name: "SettingsDialog",

  setup() {
    return {
      matArrowDropDown
    }
  },

  computed: {
    fontSizeLabel() {
      return this.preferences.fontSize + ' rem';
    }
  },

  data() {
    return {
      visible: true,
      preferences: null
    }
  },

  watch: {
    visible() {
      this.$emit('close');
    }
  },

  mounted() {
    this.preferences = {
      hideHint: this.$utils.getPreference('hideHint', false),
      autoCopy: this.$utils.getPreference('autoCopy', false),
      menuBarPos: this.$utils.getPreference('menuBarPos', 'bottom right'),
      fontSize: this.$utils.getPreference('fontSize', 1.5)
    };
  },

  methods: {
    save() {
      this.$utils.setPreference('hideHint', this.preferences.hideHint);
      this.$utils.setPreference('autoCopy', this.preferences.autoCopy);
      this.$utils.setPreference('menuBarPos', this.preferences.menuBarPos);
      this.$utils.setPreference('fontSize', this.preferences.fontSize);

      this.$q.notify({
        message: 'settings saved.',
        timeout: 2
      });
    }
  }
}
</script>
