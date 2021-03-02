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
      <!-- <div class="module-default__overall-statement">
        <div class="module-default__secondary-statement">
          <span class="module-default__main-statement">Congrats!</span>
          You’ve won a position with your employer. Please review and agree to the following terms.
          Accept or decline thereafter.
        </div>
      </div> -->
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

              <v-btn class="ma-2" x-large dark color="green" rounded depressed>End Early</v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- <v-tooltip top color="black">
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
      </v-tooltip> -->

      <v-dialog v-model="autoApply" persistent max-width="525px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            x-large
            rounded
            depressed
            :ripple="false"
            color="#6EBA7F"
            dark
            class="ml-3 mr-3"
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
            <!-- <div class="d-flex h6 font-weight-bold justify-center">
              Would you prefer this program over traditional learning?
            </div>
            <v-rating class="d-flex justify-center"></v-rating>
            <br />
            <div class="d-flex h6 font-weight-bold justify-center">
              Would you like to join our program next year?
            </div>
            <v-rating class="d-flex justify-center"></v-rating>

            <br />
            <div class="d-flex h6 font-weight-bold justify-center">
              Would you recommend this program to your other teachers?
            </div>
            <v-rating class="d-flex justify-center"></v-rating>

            <br />
            <div class="d-flex h6 font-weight-bold justify-center">
              Are you a graduating high school senior?
            </div>
            <v-switch inset class="d-flex ml-auto mr-auto justify-center"></v-switch>

            <br />
            <div class="d-flex h6 font-weight-bold justify-center">
              Automatically qualify to take classes at your local community college?
            </div>
            <v-switch inset class="d-flex ml-auto mr-auto justify-center"></v-switch>

            <br />
            <div class="d-flex h6 font-weight-bold justify-center">
              Automatically qualify for coding or computer science programs?
            </div>
            <v-switch inset class="d-flex ml-auto mr-auto justify-center"></v-switch>

            <br /> -->
            <div class="d-flex flex-row justify-start ml-12">
              <v-switch v-model="summerVacation" inset class=""></v-switch>
              <div class="d-flex h6 font-weight-bold align-center">
                Do you plan on going on Summer Vacation?
              </div>
            </div>
            <div v-if="summerVacation" class="d-flex justify-center ml-12 mr-12">
              <!-- <v-text-field
                outlined
                rounded
                label="When do you leave and come back?"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field> -->

              <v-menu
                ref="summerVacationMenu"
                v-model="summerVacationMenu"
                :close-on-content-click="false"
                :return-value.sync="summerVacationDates"
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
                  <v-btn text color="primary" @click="summerVacationMenu = false"> Cancel </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.summerVacationMenu.save(summerVacationDates)"
                  >
                    OK
                  </v-btn>
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
              <v-text-field
                v-model="summerJobHours"
                :error-messages="errors"
                label="How many estimated hours per week?"
                hint="Enter number of hours only"
                persistent-hint
                outlined
                rounded
                prepend-inner-icon="mdi-calendar-clock"
              ></v-text-field>
            </div>

            <!-- <div class="d-flex flex-row justify-start ml-12">
              <v-switch v-model="summerCollege" inset class=""></v-switch>
              <div class="d-flex h6 font-weight-bold align-center">
                Do you plan on taking Summer Classes or School? 
              </div>
            </div>
            <div v-if="summerCollege" class="d-flex justify-center">hi</div> -->

            <div class="d-flex flex-row justify-start ml-12">
              <v-switch v-model="summerClasses" inset class=""></v-switch>
              <div class="d-flex h6 font-weight-bold align-center">
                Do you plan on having Summer Classes?
              </div>
            </div>
            <div v-if="summerClasses" class="d-flex justify-center flex-column ml-12 mr-12">
              <!-- <v-text-field
                outlined
                rounded
                label="When does it start and end?"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field> -->

              <v-menu
                ref="summerClassesMenu"
                v-model="summerClassesMenu"
                :close-on-content-click="false"
                :return-value.sync="summerClassesDates"
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
                  <v-btn text color="primary" @click="summerClassesMenu = false"> Cancel </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.summerClassesMenu.save(summerClassesDates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-text-field
                v-model="summerClassesHours"
                :error-messages="errors"
                label="How many hours on average per day?"
                hint="Enter number of hours only"
                persistent-hint
                outlined
                rounded
                prepend-inner-icon="mdi-calendar-clock"
              ></v-text-field>
            </div>

            <!-- <div class="d-flex h6 font-weight-bold justify-center align-center">
              Do you plan on getting a Summer Job?
            </div>
            <v-switch inset class="d-flex ml-auto mr-auto justify-center"></v-switch>
            <div class="d-flex h6 font-weight-bold justify-center">
              Do you plan on taking Summer College Classes?
            </div>
            <v-switch inset class="d-flex ml-auto mr-auto justify-center"></v-switch>
            <div class="d-flex h6 font-weight-bold justify-center">
              Will you have to take Summer School?
            </div>
            <v-switch inset class="d-flex ml-auto mr-auto justify-center"></v-switch> -->
          </v-container>

          <v-divider class="mt-6"></v-divider>

          <v-container class="d-flex justify-center">
            <div class="d-flex flex-row justify-center mt-3 mb-5">
              <v-btn
                class="ma-2"
                color="red"
                outlined
                x-large
                rounded
                depressed
                @click="autoApply = false"
                >Cancel</v-btn
              >

              <v-btn class="ma-2" x-large dark color="green" rounded depressed
                ><v-icon left>mdi-check-all</v-icon>Auto-apply</v-btn
              >
            </div>
          </v-container>
        </v-card>
      </v-dialog>
      <div>
        <v-dialog v-model="cancelApplication" persistent max-width="650px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-3 mr-3" v-bind="attrs" outlined x-large rounded v-on="on"
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

                <v-btn class="ma-2" x-large dark color="red" rounded depressed
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
      endEarly: false,
      cancelApplication: false,
      autoApply: false,
      summerVacation: null,
      summerJob: null,
      summerJobHours: null,
      // summerCollege: null,
      summerClasses: null,
      summerClassesHours: null,
      summerVacationDates: null,
      summerVacationMenu: false,
      summerClassesDates: null,
      summerClassesMenu: false
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
