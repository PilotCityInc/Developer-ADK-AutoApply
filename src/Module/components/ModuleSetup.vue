<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-edit">
      <div class="module-edit__container">
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="preset__question1">
          <div class="preset__title1">Is a resume required?*</div>
          <v-radio-group v-model="programDoc.data.adks[index].autoapply[0].requirements" mandatory>
            <v-radio label="No"></v-radio>
            <v-radio label="Yes"></v-radio>
          </v-radio-group>
        </div>

        <div class="preset__title2">
          Is transportation required to participate in the internship program?*
        </div>
        <v-radio-group v-model="programDoc.data.adks[index].autoapply[0].resumeRequired" mandatory>
          <v-radio label="No"></v-radio>
          <v-radio label="Yes"></v-radio>
        </v-radio-group>

        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="module-default__scope">
          <v-btn x-large depressed outlined :disabled="invalid" @click="process()">Save</v-btn>
        </div>
        <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
        <!-- <div class="module-setup__none">No setup necessary</div> -->
        <!-- ENTER CONTENT HERE -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, toRefs, reactive } from '@vue/composition-api';
// import { createLoader } from 'pcv4lib/src';
import MongoDoc from '../types';

export default defineComponent({
  name: 'ModuleSetup',
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },

  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(function findautoapplyobj(obj) {
      return obj.name === 'autoapply';
    });

    const inintAutoapplysetup = {
      autoapply: [
        {
          requirements: 0,
          resumeRequired: 0
        }
      ]
    };

    programDoc.value.data.adks[index] = {
      ...inintAutoapplysetup,
      ...programDoc.value.data.adks[index]
    };

    function populate() {
      programDoc.value.data.adks[index].autoapply.push(inintAutoapplysetup.autoapply[0]);
    }

    function onSave() {
      console.log(programDoc.value.data.adks[index].autoapply[0]);
    }

    return {
      // ...toRefs(setup),
      reactive,
      programDoc,
      index,
      populate
      // ...createLoader(programDoc.value.update, 'Saved', 'Something went wrong, try again later')
    };
  }
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
