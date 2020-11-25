<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class="presets__section-title">General</div>
      <div class="presets__nopresets">No tweaking necessary</div>
      <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Instructions</div>
      <Instruct v-model="setupInstructions" />
      <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Defaults</div>

      <v-select :items="group" label="What activity group does this belong to?" outlined></v-select>
      <v-select
        :items="required"
        label="Is this activity required for participants to complete?"
        outlined
      ></v-select>

      <!-- <v-select
        :items="lockOrder"
        label="Lock activity group and placement order?"
        outlined
      ></v-select> -->
      <v-select :items="deliverable" label="Is this a deliverable?" outlined></v-select>
      <!-- <v-select
        :items="accessibility"
        label="Make this activity accessible to participants anytime?"
        outlined
      ></v-select> -->
      <v-select
        :items="endEarly"
        label="Allow participants to end program early after completion of this activity?"
        outlined
      ></v-select>
      <!-- POST-ACTIVITY REFLECTION -->
      <!-- <v-text-field
        label="Post-Activity Reflection"
        placeholder="Now that you know the scope of the project, provide a summary of your interpretation."
        outlined
        label="Get Started Folder"
        placeholder="https://drive.google.com/foldername"
        prepend-inner-icon="mdi-folder-google-drive"
      ></v-text-field>
      <div class="presets__reflection">
        <v-btn class="presets__reflection-buttons" small depressed outlined>Save</v-btn>
        <v-btn class="presets__reflection-buttons" small depressed outlined>Preview</v-btn>
      </div> -->
      <v-divider class="presets__divider"></v-divider>
      <!-- If activity is required, show button below, make tooltip show up while disabled, right now tooltip doesn't show up -->
      <!-- <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" disabled v-bind="attrs" v-on="on">Delete Activity</v-btn>
          </template>
          <span>Required activities cannot be deleted</span>
        </v-tooltip>
      </div> -->
      <!-- Delete break when the two delete buttons above and below have been integrated as one solution -->
      <br />
      <!-- If activity is optional, show button below -->
      <div><v-btn color="red" dark depressed>Delete Activity</v-btn></div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',

  setup() {
    const setup = reactive({
      outcomes: ['Build portfolio project', 'Qualify for internship to execute on project'],
      outcomesValue: ['Build portfolio project', 'Qualify for internship to execute on project'],
      deliverables: [
        'Business Model Canvas',
        'One Sentence Pitch',
        'Elevator Pitch',
        'Design & Prototype Log',
        'Prototype Demo',
        'Presentation Deck'
      ],
      deliverablesValue: [
        'Business Model Canvas',
        'One Sentence Pitch',
        'Elevator Pitch',
        'Design & Prototype Log',
        'Prototype Demo',
        'Presentation Deck'
      ],
      chips: ['Must use employer product'],
      items: ['Must use employer product', 'Must use employer service', 'Must use employer process']
    });
    return {
      ...toRefs(setup)
    };
  }
};
</script>

<style lang="scss">
.module-setup {
  &__buildscope {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
