<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-edit">
      <div class="module-edit__container">
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="preset__question1">
          <div class="preset__title1">Is a resume required?*</div>
          <v-radio-group v-model="resumeRequired" mandatory>
            <v-radio label="Yes"></v-radio>
            <v-radio label="No"></v-radio>
          </v-radio-group>
        </div>

        <div class="preset__title2">
          Is transportation required to participate in the internship program?*
        </div>
        <v-radio-group v-model="requirements" mandatory>
          <v-radio label="Yes"></v-radio>
          <v-radio label="No"></v-radio>
        </v-radio-group>

        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="module-default__scope">
          <v-btn x-large depressed outlined :disabled="invalid">Save</v-btn>
        </div>
        <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
        <!-- <div class="module-setup__none">No setup necessary</div> -->
        <!-- ENTER CONTENT HERE -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default defineComponent({
  name: 'ModuleSetup',
  data() {
    return {
      requirements: 0,
      resumeRequired: 0
    };
  }

  // setup() {
  //   // const setup = reactive({''});
  //   const requirements = ref('0');
  //   const resumeRequired = ref('0');

  //   return {
  //     // ...toRefs(setup),
  //     reactive,
  //     resumeRequired,
  //     requirements
  //   };
  // }
});
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
.preset {
  &__title2 {
    margin-bottom: 15px;
  }
}
</style>
