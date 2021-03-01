<template>
  <div class="pa-0">
    <div class="module-default__instructions">
      <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
        <v-expansion-panel>
          <v-expansion-panel-header
            v-show="showInstructions"
            hide-actions
            class="pa-0"
            @click="showInstructions = true"
          >
            <template v-slot="{ open }">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon color="grey lighten-2" class="d-flex justify-center">
                    mdi-chevron-down
                  </v-icon>
                  <div color="grey lighten-2" class="module-default__collapse-title">
                    INSTRUCTIONS
                  </div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instruct readonly />
            <div @click="showInstructions = true">
              <div class="module-default__collapse-title">CLOSE</div>
              <!-- <div class="hr"/> OPTIONAL -->
              <v-icon color="grey lighten-2" class="d-flex justify-center"> mdi-chevron-up </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-progress-linear
      class="module-default__collapse-divider"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <div>
      <Table v-model="programDoc" class="module-default__table-view"></Table>
    </div>
    <div class="d-flex justify-center flex-row mt-12">
      <v-dialog v-model="endEarly" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            x-large
            color="grey"
            rounded
            depressed
            :ripple="false"
            outlined
            class="module-default__auto"
            v-on="on"
            >End Early</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="d-flex flex-column">
            <!-- <div class="d-flex justify-center">
              <v-tooltip top color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="" v-bind="attrs" icon v-on="on"><v-icon>mdi-refresh</v-icon></v-btn>
                </template>
                <span>Resend Code</span>
              </v-tooltip>
            </div> -->

            <div class="overline font-weight-bold">Are you sure you want to end early?</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-container class="d-flex justify-center">
            <!-- <div class="d-flex flex-column justify-center"> -->
            <div class="d-flex flex-row justify-center mt-3 mb-5">
              <v-btn
                class="ma-2"
                color="red"
                dark
                x-large
                rounded
                depressed
                @click="endEarly = false"
                >Cancel</v-btn
              >

              <v-btn class="ma-2" x-large dark color="green" rounded depressed>End Early</v-btn>
            </div>

            <!-- <div class="d-flex justify-center mt-4 mb-4">
                <v-btn icon @click="endEarly = false"><v-icon>mdi-close</v-icon></v-btn>
              </div> -->
            <!-- </div> -->
          </v-container>
        </v-card>
      </v-dialog>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            x-large
            rounded
            depressed
            :ripple="false"
            color="#6EBA7F"
            dark
            class="module-default__opt"
            v-on="on"
            ><v-icon left>mdi-check-all</v-icon>Auto-apply</v-btn
          >
        </template>
        <span>Automatically apply for an internship</span>
      </v-tooltip>
    </div>
    <!-- ENTER CONTENT HERE -->
    <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING
      <div class="module-default__none">Design your activity here</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api';
import Instruct from './ModuleInstruct.vue';
import Table from './TableView.vue';
import MongoDoc from '../types';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct,
    Table
  },
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

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);

    return {
      setupInstructions,
      showInstructions,
      programDoc,
      index,
      endEarly: false
    };
  }
});
</script>

<style lang="scss">
.module-default {
  &__buttons {
    margin-bottom: 20px;
    flex-direction: row;
    display: flex;
    // align-content: center;
    // align-items: center;
    justify-content: center;
  }

  &__auto {
    margin-right: 20px;
  }

  &__opt {
  }

  &__table-view {
    width: 100%;
    // padding-left: 10px;
    // padding-right: 10px;
    margin-bottom: 20px;
  }
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

  &__collapse-divider {
    margin-top: 15px;
    // margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }

  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;

    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>
