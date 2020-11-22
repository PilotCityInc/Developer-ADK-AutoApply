<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class = "preset__question1">
      <div class = "preset__title1">Is a resume required?</div>
      <v-checkbox label="Yes"></v-checkbox>
      <v-checkbox label="No"></v-checkbox>
      </div>
      <div class = "preset__title2"> What transportation requirements are needed to participate in the internship program?</div>
      <v-text-field
        label="Enter requirements"
        value=""
        outlined
      ></v-text-field>
      <v-divider class="presets__divider"></v-divider>
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
