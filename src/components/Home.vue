<template>
  <v-container>
    <v-row>
      <v-col xs="12" lg="8" offset-lg="2">
        <v-progress-linear
        indeterminate
        color="#442B5E"
      v-if="loading"></v-progress-linear>
        <v-carousel v-if="!loading">
          <v-carousel-item
            v-for="(meetup,i) in meetups"
            :key="i"
            :src="meetup.imageURL"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="title text-center">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
        <v-row>
          <v-col xs="5">
            <v-btn
              block
              color="primary"
              elevation="2"
              x-large
              router
              :to="{name:'Meetups'}"
            >VIEW MEETUPS</v-btn>
          </v-col>
          <v-col xs="5" offset-sm="1">

            <v-btn
              block
              color="primary"
              elevation="2"
              x-large
              router
              :to="{name:'CreateMeetup'}"
            >ORGANIZE MEETUP</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.title {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
<script>
export default {
  name: 'Home',
  computed: {
    meetups () {
      return this.$store.getters.getMeetups
    },
    loading () {
      return this.$store.getters.getLoading
    }
  }
}
</script>
