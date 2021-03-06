<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-default pa-0">
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
                <v-icon color="grey lighten-2" class="d-flex justify-center">
                  mdi-chevron-up
                </v-icon>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-progress-linear
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <div class="module-default__container">
        <div v-show="setupAuto">
          <div class="justify-center d-flex mt-12">
            <v-icon color="#f79961" x-large>mdi-airballoon</v-icon>
          </div>
          <div class="module-default__statement1 headline font-weight-bold mt-6 justify-center">
            You have automatically applied! <br />
          </div>
          <div
            class="module-default__statement2 headline font-weight-medium justify-center mt-6 ml-12 mr-12"
          >
            Next step is to await an interview offer. Meanwhile, feel free to review your activities
            below
          </div>
          <div class="d-flex justify-center mb-12"></div>
        </div>
      </div>
      <Table
        :value="value"
        :page-value="PageValueIndex"
        :timeline="timeline"
        class="module-default__table-view"
        :user-type="userType"
        @input:PageValueIndex="PageValueIndex = $event"
      ></Table>

      <div class="d-flex justify-center flex-row mt-12">
        <div v-show="setUpAutoapply">
          <v-dialog v-model="endEarly" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="userType === 'stakeholder'"
                v-bind="attrs"
                x-large
                color="grey"
                rounded
                depressed
                :ripple="false"
                outlined
                class="ml-3 mr-3"
                v-on="on"
                >End Early</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="overline font-weight-bold">Are you sure you want to end early?</div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="d-flex justify-center">
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

                  <v-btn
                    class="ma-2"
                    x-large
                    dark
                    color="green"
                    rounded
                    depressed
                    @click="changeThanks"
                    >End Early</v-btn
                  >
                </div>
              </v-container>
            </v-card>
          </v-dialog>

          <v-dialog v-model="autoApply" persistent max-width="525px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="userType === 'stakeholder'"
                v-bind="attrs"
                x-large
                rounded
                depressed
                :ripple="false"
                color="#f79961"
                class="ml-3 mr-3 white--text"
                v-on="on"
                ><v-icon left>mdi-check-all</v-icon>Auto-apply</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <v-icon class="mt-2 mb-2" color="green" x-large>mdi-check-all</v-icon>
                <div class="d-flex headline font-weight-bold mt-2 mb-2">
                  Any additional Summer plans?
                </div>
              </v-card-title>

              <v-divider class="mb-6"></v-divider>

              <v-container class="d-flex flex-column justify-center">
                <div class="d-flex flex-row justify-start ml-12">
                  <v-switch v-model="summerVacation" inset class=""></v-switch>
                  <div class="d-flex h6 font-weight-bold align-center">
                    Do you plan on going on Summer Vacation?
                  </div>
                </div>
                <div v-if="summerVacation" class="d-flex justify-center ml-12 mr-12">
                  <v-menu
                    ref="summerVacationMenu"
                    v-model="summerVacationMenu"
                    :close-on-content-click="dateVacation"
                    :return-value.sync="vacationDates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="summerVacationDates"
                        rounded
                        outlined
                        multiple
                        chips
                        small-chips
                        label="Select all your vacation dates"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker
                      v-model="summerVacationDates"
                      min="2021-06-21"
                      max="2021-08-06"
                      multiple
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="summerVacationMenu = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="saveVacationDates"> OK </v-btn>
                    </v-date-picker>
                  </v-menu>
                </div>

                <div class="d-flex flex-row justify-start ml-12">
                  <v-switch v-model="summerJob" inset class=""></v-switch>
                  <div class="d-flex h6 font-weight-bold align-center">
                    Do you plan on getting a Summer Job?
                  </div>
                </div>
                <div v-if="summerJob" class="d-flex justify-center ml-12 mr-12">
                  <validation-provider v-slot="{ errors }" slim rules="numeric">
                    <v-text-field
                      v-model="estimatedhours"
                      :error-messages="errors"
                      label="How many estimated hours per week?"
                      hint="Enter number of hours only"
                      persistent-hint
                      outlined
                      rounded
                      prepend-inner-icon="mdi-calendar-clock"
                    ></v-text-field>
                  </validation-provider>
                </div>

                <div class="d-flex flex-row justify-start ml-12">
                  <v-switch v-model="summerClasses" inset class=""></v-switch>
                  <div class="d-flex h6 font-weight-bold align-center">
                    Do you plan on having Summer Classes?
                  </div>
                </div>
                <div v-if="summerClasses" class="d-flex justify-center flex-column ml-12 mr-12">
                  <v-menu
                    ref="summerClassesMenu"
                    v-model="summerClassesMenu"
                    :close-on-content-click="dateSummer"
                    :return-value.sync="summerDates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="summerClassesDates"
                        rounded
                        outlined
                        multiple
                        chips
                        small-chips
                        label="Select all your class dates"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker
                      v-model="summerClassesDates"
                      min="2021-06-21"
                      max="2021-08-06"
                      multiple
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="summerClassesMenu = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="saveSummerDates"> OK </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <validation-provider v-slot="{ errors }" slim rules="numeric|required">
                    <v-text-field
                      v-model="summerHours"
                      :error-messages="errors"
                      label="How many hours on average per day?"
                      hint="Enter number of hours only"
                      persistent-hint
                      outlined
                      rounded
                      prepend-inner-icon="mdi-calendar-clock"
                    ></v-text-field>
                  </validation-provider>
                </div>
              </v-container>

              <v-divider class="mt-6"></v-divider>

              <v-container class="d-flex justify-center">
                <div class="d-flex flex-row justify-center mt-3 mb-5">
                  <v-btn
                    class="ma-2"
                    color="grey"
                    outlined
                    x-large
                    rounded
                    depressed
                    @click="autoApply = false"
                    >Cancel</v-btn
                  >

                  <v-btn
                    class="ma-2 white--text"
                    x-large
                    color="#f79961"
                    rounded
                    depressed
                    :disabled="invalid"
                    @click="process"
                    ><v-icon left>mdi-check-all</v-icon>Auto-apply</v-btn
                  >
                </div>
              </v-container>
              <v-alert
                v-if="success || error"
                dense
                class="mt-3 white--text presets__alert"
                :color="success ? 'green' : 'red'"
                >{{ message }}</v-alert
              >
            </v-card>
          </v-dialog>
        </div>
        <div v-show="setupEndEarly">
          <div class="module-default__statement1 headline font-weight-bold mt-6 justify-center">
            Thank you for participating. <br />
          </div>
          <div
            class="module-default__statement2 headline font-weight-medium justify-center mt-6 ml-12 mr-12"
          >
            We will deliver your program results soon.
          </div>
        </div>
        <div>
          <v-dialog v-model="cancelApplication" persistent max-width="650px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-show="setupAuto"
                :disabled="userType === 'stakeholder'"
                class="ml-3 mr-3"
                v-bind="attrs"
                outlined
                x-large
                rounded
                v-on="on"
                >Cancel Application</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="overline font-weight-bold">
                  Are you sure you want to cancel your application and end early?
                </div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="d-flex justify-center">
                <div class="d-flex flex-row justify-center mt-3 mb-5">
                  <v-btn
                    class="ma-2"
                    color="grey"
                    outlined
                    x-large
                    rounded
                    depressed
                    @click="cancelApplication = false"
                    >Just Kidding</v-btn
                  >

                  <v-btn
                    class="ma-2"
                    x-large
                    dark
                    color="red"
                    rounded
                    depressed
                    @click="changeThanks"
                    >Cancel Application and End Early</v-btn
                  >
                </div>
              </v-container>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING
      <div class="module-default__none">Design your activity here</div> -->
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, reactive, toRefs } from '@vue/composition-api';
import { getModAdk, loading } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import Table from './TableView.vue';
import MongoDoc, { Timeline } from '../types';

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
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    PageValue: {
      required: true,
      type: Number
    },
    timeline: {
      required: true,
      type: Array as PropType<Timeline[]>
    }
  },
  setup(props, ctx) {
    const PageValueIndex = computed({
      get: () => props.PageValue,
      set: newPage => {
        ctx.emit('input:PageValue', newPage);
      }
    });

    const modal1 = ref('');

    const initAutoapplydefault = {
      vacationDates: [],
      estimatedhours: '',
      summerDates: [],
      summerHours: '',
      summerVacation: false,
      summerVacationDates: [],
      summerJob: false,
      summerClasses: false,
      summerClassesDates: [],
      setupAuto: false,
      autoApply: false,
      endEarly: false,
      setupEndEarly: false,
      setUpAutoapply: true,
      cancelApplication: false
    };

    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'autoapply',
      initAutoapplydefault,
      'studentDoc',
      'inputStudentDoc'
    );
    const state = reactive({
      ...adkData.value
    });
    const dateVacation = ref(false);
    const dateSummer = ref(false);

    function saveSummerDates() {
      dateSummer.value = true;
      while (state.summerDates.length > 0) {
        state.summerDates.pop();
      }
      state.summerDates.push(...state.summerClassesDates);

      // console.log(state.summerDates);
    }

    function saveVacationDates() {
      dateVacation.value = true;
      while (state.vacationDates.length > 0) {
        state.vacationDates.pop();
      }
      state.vacationDates.push(...state.summerVacationDates);
      // console.log(adkData.value.vacationDates);
    }
    // menus

    function populate() {
      state.setupAuto = true;
      state.setUpAutoapply = false;
      state.autoApply = false;

      // Tell the user they've auto-applied and let them continue to the next section.
      adkData.value = {
        ...adkData.value,
        ...state
      };
      return props.studentDoc.update(() => ({
        isComplete: true,
        adkIndex
      }));
    }

    function changeThanks() {
      state.cancelApplication = false;
      state.setupAuto = false;
      state.endEarly = false;
      state.setUpAutoapply = false;
      state.setupEndEarly = true;
      adkData.value = {
        ...adkData.value,
        ...state
      };
      return props.studentDoc.update(() => ({
        isComplete: true,
        adkIndex
      }));
    }

    const showInstructions = ref(true);

    return {
      populate,
      PageValueIndex,
      showInstructions,
      modal1,
      adkData,
      ...toRefs(state),
      summerVacationMenu: false,
      summerClassesMenu: false,
      saveSummerDates,
      saveVacationDates,
      changeThanks,
      ...loading(populate, 'Success', 'Try again later'),
      state,
      dateVacation,
      dateSummer
    };
  }
});
</script>

<style lang="scss">
.module-default {
  &__statement1 {
    text-align: center;
    color: #f79961;
  }
  &__statement2 {
    text-align: center;
    color: #d3d3d3;
  }
  &__buttons {
    margin-bottom: 20px;
    flex-direction: row;
    display: flex;
    // align-content: center;
    // align-items: center;
    justify-content: center;
  }

  &__auto {
    // margin-right: 20px;
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
    width: 100%;
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
