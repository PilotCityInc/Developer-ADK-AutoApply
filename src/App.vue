<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :user-type="userTypeStub"
      :student-doc="studentDoc"
      :timeline="timeline"
      :current-page-table="currentPageTable"
      @inputStudentDoc="studentDoc = $event"
      @input:currentPageTable="currentPageTable = $event"
    />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
// import ApolloExample from './components/ApolloExample.vue';
import Module from './Module/Module.vue';
import MongoDoc from './Module/types';

export default defineComponent({
  name: 'App',

  components: {
    Module
  },
  setup() {
    const programDocStub: Ref<MongoDoc> = ref({
      data: {
        adks: []
      },
      update: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },

      changeStream: {}
    });

    const studentDoc: Ref<MongoDoc> = ref({
      data: {
        adks: []
      },
      update: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });

    const timeline = [
      {
        step: 'Scope',
        unlocked: true
      },
      {
        step: 'AutoApply',
        unlocked: true
      }
    ];
    const userTypeStub = 'participant';
    const currentPageTable = ref(timeline.length - 1);
    return {
      programDocStub,
      studentDoc,
      timeline,
      userTypeStub,
      currentPageTable
    };
  }
});
</script>
