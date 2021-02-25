<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
      <div class="module-setup__none">No setup necessary</div>
      <!-- ENTER CONTENT HERE -->
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, toRefs, reactive } from '@vue/composition-api';
import { createLoader } from 'pcv4lib/src';
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
      populate,
      ...createLoader(programDoc.value.update, 'Saved', 'Something went wrong, try again later')
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
