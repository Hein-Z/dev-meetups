<template>
  <v-row>
    <v-col cols="12"><h1 class="text-center" style="color: #963E75">All MeetUps</h1></v-col>
    <v-col offset="1" cols="10" v-if="isLoading">
      <v-progress-linear
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-col>
    <v-col xs="12" md="6" v-for="(item,index) in meetups" :key="index">
      <v-card
        color="#952175"
        dark
        class="mx-5"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="d-flex flex-nowrap flex-column justify-space-between">
            <v-card-title
              class="headline"
              v-text="item.place"
            ></v-card-title>
            <v-card-subtitle v-text="item.title" class="pb-0"></v-card-subtitle>
            <v-card-subtitle v-text="'Create by : '+item.author_name" class="pb-0"></v-card-subtitle>
            <v-card-subtitle v-text="'Date : '+item.date +' , ' +  item.time" class="pb-0"></v-card-subtitle>

            <v-card-actions>
              <router-link router
                           :to="{name:'MeetupDetails',params:{id:item.id}}"
                           tag="span">
                <v-btn
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                >
                  See more
                </v-btn>
              </router-link>
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="150"
            tile
          >
            <v-img :src="item.imageURL"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>

  </v-row>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    meetups () {
      return this.$store.getters.getMeetups
    },
    isLoading () {
      return this.$store.getters.getLoading
    }
  },
  created: () => console.log()
}
</script>
