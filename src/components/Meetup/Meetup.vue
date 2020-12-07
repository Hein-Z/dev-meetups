<template>
  <v-row>
    <div style="display: contents" v-if="getIsLoading">
      <v-col class="subtitle-1 text-center" cols="12">
        Loading Meetups Data
      </v-col>
      <v-col cols="6" offset="3">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </div>
    <v-col xs="12" md="10" offset-md="1" v-if="!getIsLoading">
      <v-card class="mx-auto" max-width="500">
        <div>
          <edit-meetups-dialog
            v-if="isUserCreater"
            class="edit-dialog"
            :meetup="getMeetup"
          >
          </edit-meetups-dialog>
          <v-img :src="getMeetup.imageURL" height="auto"></v-img>
        </div>

        <v-card-title>
          {{ getMeetup.place }}
        </v-card-title>
        <v-card-title> created by : {{ getMeetup.author_name }} </v-card-title>
        <v-card-subtitle>
          {{ getMeetup.title }}
        </v-card-subtitle>
        <v-card-subtitle>
          Date : {{ getMeetup.date }}
          <edit-meetups-date
            v-if="isUserCreater"
            class="edit-dialog"
            :meetup="getMeetup"
          ></edit-meetups-date>
        </v-card-subtitle>
        <v-card-subtitle>
          Time : {{ getMeetup.time }}
          <edit-meetups-time
            v-if="isUserCreater"
            class="edit-dialog"
            :meetup="getMeetup"
          ></edit-meetups-time>
        </v-card-subtitle>
        <v-card-actions>
          <register-dialog
            :meetup-id="getMeetup.id"
            v-if="isUserAuth && !isUserCreater"
          ></register-dialog>
          <v-spacer></v-spacer>

          <v-btn @click="show = !show" small>
            {{ show ? "See Less" : "See More" }}
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{ getMeetup.description }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>
<style>
.edit-btn {
  position: absolute;
  z-index: 100;
  right: 10px;
  top: 10px;
}

.edit-dialog {
  z-index: 900000;
}
</style>
<script>
export default {
  props: ['id'],
  data: () => ({
    show: false
  }),
  computed: {
    getMeetup () {
      return this.$store.getters.getMeetupById(this.id)
    },
    isUserAuth () {
      return (
        this.$store.getters.getUser !== null ||
        this.$store.getters.getUser !== undefined
      )
    },
    isUserCreater () {
      if (!this.$store.getters.getUser) {
        return false
      }
      if (!this.isUserAuth) {
        return false
      }
      return this.$store.getters.getUser.id === this.getMeetup.author_id
    },
    getIsLoading () {
      return this.$store.getters.getLoading
    }
  },
  methods: {},
  created () {}
}
</script>
