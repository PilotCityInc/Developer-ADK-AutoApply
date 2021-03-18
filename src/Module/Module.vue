<template>
  <!--  TODO: make the inputs into actual components -->
  <v-container class="module">
    <div class="module__navbar">
      <v-btn
        v-if="currentPage != 'preview' && userType === 'organizer'"
        class="module__navbar-button font-weight-bold"
        outlined
        small
        rounded
        depressed
        @click="currentPage = 'preview'"
        >Preview</v-btn
      >
      <v-btn
        v-if="currentPage == 'preview' && userType === 'organizer'"
        class="module__navbar-button font-weight-bold"
        dark
        small
        rounded
        depressed
        color="red"
        @click="currentPage = 'setup'"
        >Exit Preview</v-btn
      >
    </div>
    <div class="module__container" :style="{ 'border-color': getColor }">
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon light x-large :color="selectedColor">mdi-check-all</v-icon>
        </div>
        <div class="module__header text-md-h5 text-sm-subtitle-1 d-flex align-center">
          <input disabled :value="moduleName" type="text" class="module__header-text mb-5" />
        </div>
      </div>
      <div class="module__body">
        <v-progress-linear
          v-if="currentPage != 'preview'"
          color="#dedede"
          height="2"
          value="100"
          buffer-value="100"
          stream
        />

        <div v-if="currentPage != 'preview'" class="module__pagination">
          <div v-for="page in subpages" :key="page" :class="{ active: currentPage == page }">
            <div class="module__pagination-button--active" />
            <v-btn
              :ripple="false"
              class="module__pagination-button"
              elevation="0"
              color="#ffffff"
              height="40"
              small
              @click="currentPage = page"
            >
              {{ page }}
            </v-btn>
          </div>
        </div>
        <div class="module__page">
          <!-- <keep-alive> -->
          <component
            :is="getComponent"
            v-model="programDoc"
            :student-doc="studentDocument"
            :page-value="PageValue"
            :timeline="timelineDuplicate"
            @input:PageValue="PageValue = $event"
          />
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
  </v-container>
</template>
<style lang="scss">
html,
body {
  font-family: 'Raleway';
  font-size: 16px;
  width: 100%;
  height: 100%;
}
.v-timeline-item__divider {
  // align-items: start !important;
}
.module {
  &__trash {
    // justify-content: start;
    align-items: start;
    // align-content: start;
  }
  &__header-chips {
    padding-bottom: 15px;
  }
}
.v-btn__content.module__chat-menu-button {
  justify-content: left;
  width: 100%;
}
.module__menu {
  .v-color-picker {
    &__controls {
      display: none;
    }
  }
}
</style>
<script lang="ts">
import { computed, reactive, ref, toRefs, defineComponent, PropType } from '@vue/composition-api';
import '../styles/module.scss';
import { getModMongoDoc } from 'pcv4lib/src';
import * as Module from './components';
import MongoDoc, { Timeline } from './types';

export default defineComponent({
  name: 'ModuleName',
  components: {
    'module-setup': Module.Setup,
    'module-presets': Module.Presets,
    'module-preview': Module.Default
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    currentPageTable: {
      required: true,
      type: Number
    },
    timeline: {
      required: true,
      type: Array as PropType<Timeline[]>
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },
  setup(props, ctx) {
    const programDoc = getModMongoDoc(props, ctx.emit);

    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');

    const PageValue = computed({
      get: () => props.currentPageTable,
      set: newPage => {
        ctx.emit('input:currentPageTable', newPage);
      }
    });

    // ENTER ACTIVITY NAME BELOW
    const moduleName = ref('Auto-Application');
    const page = reactive({
      subpages: ['Setup', 'Presets'],
      currentPage: 'Setup'
    });
    if (props.userType === 'organizer') {
      page.currentPage = 'setup';
    } else {
      page.currentPage = 'preview';
    }
    const getComponent = computed(() => {
      return `module-${page.currentPage.toLowerCase()}`;
    });
    const color = reactive({
      pilotcityColors: [
        ['#6eba80', '#3c9dcd', '#ea6764'],
        ['#eda1bf', '#fec34b', '#bdbdbd'],
        ['#ae90b0', '#f79961', '#000000']
      ],
      // ENTER ACTIVITY COLOR
      selectedColor: '#f79961'
    });
    const getColor = computed(() => {
      return color.selectedColor.substring(0, 7);
    });
    const config = ref({
      description: '',
      instruct: ['']
    });
    const menu = ref(false);
    // timeline
    const timelineData = reactive({
      events: [] as {
        id: number;
        text: string;
        time: string;
      }[],
      input: '',
      nonce: 0
    });
    const timelineDuplicate = computed(() => {
      return timelineData.events.slice().reverse();
    });
    function comment() {
      const time = new Date().toTimeString();
      timelineData.events.push({
        id: timelineData.nonce,
        text: timelineData.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
          return ` ${contents
            .split(' ')
            .map((v: string) => v.charAt(0))
            .join('')}`;
        })
      });
      timelineData.input = '';
    }
    return {
      ...toRefs(color),
      ...toRefs(page),
      config,
      moduleName,
      menu,
      getComponent,
      getColor,
      ...toRefs(timelineData),
      timelineDuplicate,
      comment,
      studentDocument,
      programDoc,
      PageValue
    };
  }
});
</script>
