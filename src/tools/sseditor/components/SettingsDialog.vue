<template>
  <q-dialog v-model="visible" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">settings</div>
      </q-card-section>

      <q-card-section>
        <q-checkbox v-model="preferences.hideHint" label="hide hint placeholder" color="black" />
      </q-card-section>

      <q-card-section>
        <q-checkbox v-model="preferences.autoCopy" label="auto-copy to clipboard while editing" color="black" />
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
export default {
  name: "SettingsDialog",

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
      autoCopy: this.$utils.getPreference('autoCopy', false)
    };
  },

  methods: {
    save() {
      this.$utils.setPreference('hideHint', this.preferences.hideHint);
      this.$utils.setPreference('autoCopy', this.preferences.autoCopy);

      this.$q.notify({
        message: 'settings saved.',
        timeout: 2
      });
    }
  }
}
</script>
