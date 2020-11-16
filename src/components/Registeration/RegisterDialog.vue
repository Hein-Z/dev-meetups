<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        dark
        large
        color="#6A76AB"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        {{ userIsRegistered ? 'Unregister' : 'Register' }}
      </v-btn>
    </template>
    <v-card class="edit-card">
      <v-card-title>
        <h3 class="text-center mr-auto ml-auto" v-if="userIsRegistered">UnRegister for Meetup?</h3>
        <h3 class="text-center mr-auto ml-auto" v-else>Register for Meetup?</h3>
      </v-card-title>
      <v-card-text>
        You Can Always Change Your Decision Later On.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          @click="dialog = false"
          outlined
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
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
  computed: {
    userIsRegistered () {
      return this.$store.getters.getUser.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onConfirm () {
      this.dialog = false
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerForMeetup', this.meetupId)
      }
    }
  },
  created () {

  }
}
</script>
