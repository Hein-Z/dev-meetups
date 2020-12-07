<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2 "
        dark
        color="#6A76AB"
        v-bind="attrs"
        v-on="on"
        x-small
      >
        Edit Time
      </v-btn>
    </template>
    <v-card class="edit-card">
      <v-card-title>
        <h3 class="text-center mr-auto ml-auto">Edit Meetup Time</h3>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-time-picker
                v-model="time"
                :landscape="$vuetify.breakpoint.smAndUp"
                ampm-in-title
                format="ampm"
              ></v-time-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          @click="dialog = false"
          outlined
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          outlined
          @click="onSaveEditedDate"
        >
          Save
        </v-btn>
      </v-card-actions>
      <small>*indicates required field</small>
    </v-card>
  </v-dialog>
</template>
<style>
.edit-card {
  z-index: 2000000;
}
</style>
<script>
export default {
  props: ['meetup'],
  data: () => (
    {
      dialog: false,
      time: '',
      date: ''
    }),
  methods: {
    onSaveEditedDate () {
      this.dialog = false
      this.$store.dispatch('updateMeetupsData', {
        id: this.meetup.id,
        date: this.date,
        time: this.time,
        timestamp: new Date(this.date + ' ' + this.time).valueOf()
      })
    }
  },
  created () {
    this.date = this.meetup.date
    this.time = this.meetup.time
  }
}
</script>
