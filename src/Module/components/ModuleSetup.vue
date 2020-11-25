<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class="preset__question1">
        <div class="preset__title1">Is a resume required?</div>
        <v-checkbox label="Yes"></v-checkbox>
        <v-checkbox label="No"></v-checkbox>
      </div>
      <div class="preset__title2">
        What transportation requirements are needed to participate in the internship program?
      </div>
      <v-text-field label="Enter requirements" value="" outlined></v-text-field>
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class="module-default__scope">
        <v-btn x-large depressed outlined>Save</v-btn>
      </div>
      <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
      <!-- <div class="module-setup__none">No setup necessary</div> -->
      <!-- ENTER CONTENT HERE -->
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',

  setup() {
    const setup = reactive({});
    return {
      ...toRefs(setup)
    };
  }
};
</script>

<style lang="scss">
.module-setup {
  &__none {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }
}
</style>
