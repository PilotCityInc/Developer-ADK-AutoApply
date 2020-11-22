<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class = "preset__question1">
      <div class = "preset__title1">Is a resume required?</div>
      <v-checkbox label="Yes"></v-checkbox>
      <v-checkbox label="No"></v-checkbox>
      </div>
      <div class = "preset__title2">What transportation requirements are needed to participate in the internship program?</div>
      <v-text-field
        label="Enter requirements"
        value=""
        outlined
      ></v-text-field>
      <v-divider class="presets__divider"></v-divider>
      <template>
        <v-combobox
          v-model="chips"
          outlined
          flat
          :items="items"
          chips
          multiple
          label="Project Requirements"
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong
              >&nbsp;
              <span></span>
            </v-chip>
          </template>
        </v-combobox>
      </template>

      <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Provide Resources</div>

      <v-text-field
        outlined
        label="Website"
        placeholder="https://www.employername.com/"
        prepend-inner-icon="mdi-search-web"
      ></v-text-field>

      <v-text-field
        outlined
        label="Instagram"
        placeholder="https://www.instagram.com/username"
        prepend-inner-icon="mdi-instagram"
      ></v-text-field>

      <v-text-field
        outlined
        label="LinkedIn"
        placeholder="https://www.linkedin.com/username"
        prepend-inner-icon="mdi-linkedin"
      ></v-text-field>

      <v-text-field
        outlined
        label="Facebook"
        placeholder="https://www.facebook.com/username"
        prepend-inner-icon="mdi-facebook"
      ></v-text-field>

      <v-text-field
        outlined
        label="YouTube"
        placeholder="https://www.youtube.com/username"
        prepend-inner-icon="mdi-youtube"
      ></v-text-field>

      <v-text-field
        outlined
        label="Get Started Folder"
        placeholder="https://drive.google.com/foldername"
        prepend-inner-icon="mdi-folder-google-drive"
      ></v-text-field>

      <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Self-Interview</div>

      <v-textarea
        outlined
        label="What is the urgency of this problem?"
        placeholder="In a tweet or less, answer the question for student participants."
      ></v-textarea>

      <v-textarea
        outlined
        label="Who could be possible users of the solution created?"
        placeholder="In a tweet or less, answer the question for student participants."
      ></v-textarea>

      <v-textarea
        outlined
        label="What are the opportunities?"
        placeholder="In a tweet or less, answer the question for student participants."
      ></v-textarea>

      <v-textarea
        outlined
        label="What are the known challenges?"
        placeholder="In a tweet or less, answer the question for student participants."
      ></v-textarea>

      <v-textarea
        outlined
        label="Why are you requesting projects from students?"
        placeholder="In a tweet or less, answer the question for student participants."
      ></v-textarea>

      <div class="module-default__scope">
        <v-btn x-large depressed outlined>Save</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',

  setup() {
    const setup = reactive({
      outcomes: ['Build portfolio project', 'Qualify for internship to execute on project'],
      outcomesValue: ['Build portfolio project', 'Qualify for internship to execute on project'],
      deliverables: [
        'Business Model Canvas',
        'One Sentence Pitch',
        'Elevator Pitch',
        'Design & Prototype Log',
        'Prototype Demo',
        'Presentation Deck'
      ],
      deliverablesValue: [
        'Business Model Canvas',
        'One Sentence Pitch',
        'Elevator Pitch',
        'Design & Prototype Log',
        'Prototype Demo',
        'Presentation Deck'
      ],
      chips: ['Must use employer product'],
      items: ['Must use employer product', 'Must use employer service', 'Must use employer process']
    });
    return {
      ...toRefs(setup)
    };
  }
};
</script>

<style lang="scss">
.module-setup {
  &__buildscope {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
