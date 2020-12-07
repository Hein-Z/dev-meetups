<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2 edit-btn"
        fab
        dark
        large
        color="#6A76AB"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card class="edit-card">
      <v-card-title>
        <h3 class="text-center mr-auto ml-auto">Edit Meetup Content</h3>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Location Name*"
                name="location"
                id="location*"
                v-model="place"
                required
                filled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Title*"
                name="title"
                id="title"
                v-model="title"
                required
                filled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-textarea
                filled
                name="input-7-4"
                label="Description"
                v-model="description"
              ></v-textarea>
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
          @click="onSaveEditedData"
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
      description: '',
      title: '',
      place: ''
    }),
  methods: {
    onSaveEditedData () {
      if (this.title.trim() === '' || this.description.trim() === '' || this.place.trim() === '') {
        return
      }
      this.dialog = false
      this.$store.dispatch('updateMeetupsData', {
        id: this.meetup.id,
        title: this.title,
        description: this.description,
        place: this.place
      })
    }
  },
  created () {
    this.description = this.meetup.description
    this.title = this.meetup.title
    this.place = this.meetup.place
  }
}
</script>
