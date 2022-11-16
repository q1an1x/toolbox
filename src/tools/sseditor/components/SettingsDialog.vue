<template>
  <q-dialog v-model="visible" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">settings</div>
      </q-card-section>

      <q-card-section>
        <q-checkbox
          color="black"
          v-model="preferences.hideHint"
          label="hide hint placeholder"
        />
      </q-card-section>

      <q-card-section>
        <q-checkbox
          color="black"
          v-model="preferences.autoCopy"
          label="auto-copy to clipboard while editing"
        />
      </q-card-section>

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
      menuBarPos: this.$utils.getPreference('menuBarPos', 'bottom right')
    };
  },

  methods: {
    save() {
      this.$utils.setPreference('hideHint', this.preferences.hideHint);
      this.$utils.setPreference('autoCopy', this.preferences.autoCopy);
      this.$utils.setPreference('menuBarPos', this.preferences.menuBarPos);

      this.$q.notify({
        message: 'settings saved.',
        timeout: 2
      });
    }
  }
}
</script>