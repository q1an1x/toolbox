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
        <div class="text-subtitle1">caret style</div>
        <q-list bordered separator class="rounded-borders">
          <q-item>
            <q-item-section>
              <q-item-label overline>normal</q-item-label>
              <color-picker
                :color="preferences.normalCaretColor"
                @update="(color) => { preferences.normalCaretColor = color }"
              />
            </q-item-section>
            <q-item-section>
              <caret-type-select
                :type="preferences.normalCaretType"
                @update="(type) => { preferences.normalCaretType = type }"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>superscript</q-item-label>
              <color-picker
                :color="preferences.superCaretColor"
                @update="(color) => { preferences.superCaretColor = color }"
              />
            </q-item-section>
            <q-item-section>
              <caret-type-select
                :type="preferences.superCaretType"
                @update="(type) => { preferences.superCaretType = type }"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>subscript</q-item-label>
              <color-picker
                :color="preferences.subCaretColor"
                @update="(color) => { preferences.subCaretColor = color }"
              />
            </q-item-section>
            <q-item-section>
              <caret-type-select
                :type="preferences.subCaretType"
                @update="(type) => { preferences.subCaretType = type }"
              />
            </q-item-section>
          </q-item>
        </q-list>
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
        note: in order for the changes to take effect, you may need to refresh the page after saving. the caret type option does not yet work with most browsers as the style property used is not implemented, but it might work someday(found out after making it).
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="reset" color="red" @click="reset" />
        <q-btn flat no-caps label="close without saving" color="grey" v-close-popup />
        <q-btn flat no-caps label="save" color="black" @click="save" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { matArrowDropDown } from '@quasar/extras/material-icons';
import ColorPicker from "src/tools/sseditor/components/ColorPicker";
import CaretTypeSelect from "src/tools/sseditor/components/CaretTypeSelect";

export default {
  name: "SettingsDialog",
  components: { CaretTypeSelect, ColorPicker },
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
    this.load();
  },

  methods: {
    load() {
      this.preferences = {
        hideHint: this.$utils.getPreference('hideHint', false),
        autoCopy: this.$utils.getPreference('autoCopy', false),
        menuBarPos: this.$utils.getPreference('menuBarPos', 'bottom right'),
        fontSize: this.$utils.getPreference('fontSize', 1.5),
        normalCaretColor: this.$utils.getPreference('normalCaretColor', '#000000'),
        normalCaretType: this.$utils.getPreference('normalCaretType', 'bar'),
        superCaretColor: this.$utils.getPreference('superCaretColor', '#fdae42'),
        superCaretType: this.$utils.getPreference('superCaretType', 'block'),
        subCaretColor: this.$utils.getPreference('subCaretColor', '#55b4f5'),
        subCaretType: this.$utils.getPreference('subCaretType', 'block'),
      };
    },

    save() {
      this.$utils.setPreference('hideHint', this.preferences.hideHint);
      this.$utils.setPreference('autoCopy', this.preferences.autoCopy);
      this.$utils.setPreference('menuBarPos', this.preferences.menuBarPos);
      this.$utils.setPreference('fontSize', this.preferences.fontSize);
      this.$utils.setPreference('normalCaretColor', this.preferences.normalCaretColor);
      this.$utils.setPreference('normalCaretType', this.preferences.normalCaretType);
      this.$utils.setPreference('superCaretColor', this.preferences.superCaretColor);
      this.$utils.setPreference('superCaretType', this.preferences.superCaretType);
      this.$utils.setPreference('subCaretColor', this.preferences.subCaretColor);
      this.$utils.setPreference('subCaretType', this.preferences.subCaretType);

      this.$q.notify({
        message: 'settings saved.',
        timeout: 2
      });
    },

    reset() {
      this.$q.dialog({
        title: 'are you sure?',
        color: 'black',
        message: 'all settings will be reset back to default if you proceed.',
        ok: {
          label: 'sure!',
          noCaps: true,
          flat: true,
          color: 'red'
        },
        cancel: {
          label: 'nah i am good',
          noCaps: true,
          flat: true,
          color: 'grey'
        }
      }).onOk(() => {
        this.$utils.resetPreference();
        this.$q.notify({
          message: 'settings reset.',
          timeout: 2
        });
        this.load();
      });
    }
  }
}
</script>
