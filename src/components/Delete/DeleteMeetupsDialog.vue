<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2 mt-5 px-4"
        rounded
        small
        v-bind="attrs"
        v-on="on"
        color="red"
      >
        Delete
      </v-btn>

    </template>
    <v-card class="edit-card">
      <v-card-title>
        <h3 class="text-center mr-auto ml-auto red--text">Are You Sure To Delete This Meetups?
        </h3>
      </v-card-title>
      <v-card-text>
        You Can't Backup Deleted Meetups
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          @click="dialog = false"
          outlined
        >
          Cancel
        </v-btn>
        <v-btn
          color="red darken-1"
          outlined
          @click="onConfirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
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
  props: ['meetupId'],
  data: () => (
    {
      dialog: false
    }),
  computed: {},
  methods: {
    onConfirm () {
      this.dialog = false
      this.$store.dispatch('deleteMeetup', this.meetupId)
    }
  },
  created () {

  }
}
</script>
