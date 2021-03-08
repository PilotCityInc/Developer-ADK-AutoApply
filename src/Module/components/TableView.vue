<template>
  <div>
    <v-data-table
      :headers="header"
      :items="items"
      sort-by="resource"
      :items-per-page="100"
      :hide-default-footer="true"
    >
      <template v-slot:item.group="{ item }">
        <v-chip depressed dark small :color="getColor(item.group)" :ripple="false">{{
          item.group
        }}</v-chip>
      </template>

      <template v-slot:item.click="{ item }">
        <v-btn outlined depressed x-small :ripple="false" @click="pageSelection(item.index)"
          >Update</v-btn
        >
      </template>

      <template v-slot:item.type="{ item }">
        <v-chip depressed outlined dark small :color="getColor(item.type)" :ripple="false">{{
          item.type
        }}</v-chip>
      </template>

      <template v-slot:item.status>
        <v-icon color="green" dark>mdi-lock-open-check</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from '@vue/composition-api';
import { items, HEADER } from './const';
import { Timeline } from '../types';

export default defineComponent({
  name: 'TableView',
  props: {
    PageValue: {
      required: true,
      type: Number
    },
    timeline: {
      required: true,
      type: Object as () => Timeline
    }
  },

  setup(props, ctx) {
    const PageValueNumber = computed({
      get: () => props.PageValue,
      set: newPage => {
        ctx.emit('input:PageValueIndex', newPage);
      }
    });

    const pageindex = ref();

    function pageSelection(index: any) {
      PageValueNumber.value = index;
      console.log(PageValueNumber.value);
    }

    function getColor(group: any) {
      if (group === 'Onboard') {
        return 'red';
      }
      if (group === 'Research') {
        return 'green';
      }
      if (group === 'Design') {
        return 'blue';
      }
      if (group === 'Prototype') {
        return 'yellow';
      }
      if (group === 'Activity') {
        return 'pink';
      }
      if (group === 'Deliverable') {
        return 'purple';
      }
      return 'Null';
    }

    return { header: ref(HEADER), items, pageSelection, pageindex, getColor };
  }
});
</script>
