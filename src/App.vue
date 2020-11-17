<template>
  <div id="app">
    <v-app>
      <!--==================nav drawer===================-->
      <v-navigation-drawer
        v-model="drawer"
        temporary
        style="z-index: 90000;position:fixed;">
        <v-list-item router :to="{name:'Home'}" style="color: #6A76AB">
          <v-list-item-content>
            <v-list-item-title>
              <h1>Dev Meetups</h1>
            </v-list-item-title>
            <v-list-item-subtitle class="text--primary" style="font-weight: bolder">
              {{isUserAuth?"User Name : "+$store.getters.getUser.username:'Home'}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <div style="display: contents" v-if="isUserAuth">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              router
              :to="{name:item.link}"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item
            link
            router
            :to="{name:'Signup'}"
            v-if="!isUserAuth"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Sign Up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            router
            :to="{name:'Signin'}"
            v-if="!isUserAuth"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-arrow-left</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            router
            @click="logOut"
            v-if="isUserAuth"
            class="mt-5"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-arrow-right</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!--==================nav drawer===================-->
      <v-app-bar
        color="#6A76AB"
        dark
        style="position: fixed;z-index: 1000"
        :extended="isUserAuth"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link :to="{name:'Home'}" tag="span" style="cursor: pointer">Dev Meetups</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-menu
          bottom
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="yellow"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="!isUserAuth">
              <v-list-item-title>
                <router-link :to="{name:'Signin'}" tag="span" style="cursor: pointer">
                  <v-icon>mdi-account-arrow-left-outline</v-icon>
                  Sign in
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!isUserAuth">
              <v-list-item-title>
                <router-link :to="{name:'Signup'}" tag="span" style="cursor: pointer">
                  <v-icon>mdi-account</v-icon>
                  Sign up
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut" v-if="isUserAuth">
              <v-list-item-title>
                <v-icon>mdi-account-arrow-right-outline</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!--==============nav tabs==================-->
        <template v-slot:extension v-if="isUserAuth">
          <v-tabs grow>
            <v-tab router :to="{name:'Home'}">
              <v-icon class="mr-2" medium>mdi-home</v-icon>
              <span class="d-none d-sm-inline-block">Home</span>
            </v-tab>
            <v-tab router :to="{name:'Meetups'}">
              <v-icon class="mr-2" medium>mdi-account-supervisor-outline</v-icon>
              <span class="d-none d-sm-inline-block">View Meetups</span>
            </v-tab>
            <v-tab router :to="{name:'Profile'}">
              <v-icon class="mr-2" medium>mdi-account-outline</v-icon>
              <v-badge
                color="green"
                :content="$store.getters.getNotifications"
              >
                <span class="d-none d-sm-inline-block">Profile</span>
              </v-badge>
            </v-tab>
            <v-tab router :to="{name:'CreateMeetup'}">
              <v-icon class="mr-2" medium>mdi-comment-edit-outline</v-icon>
              <span class="d-none d-sm-inline-block">Organize Meetup</span>
            </v-tab>
          </v-tabs>
        </template>
        <!--===============nav tab=================-->
      </v-app-bar>
      <v-sheet>
        <main style="margin-top: 110px">
          <router-view></router-view>
        </main>
      </v-sheet>
    </v-app>
  </div>
</template>

<script>

export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'View Meetups',
        icon: 'mdi-account-supervisor',
        link: 'Meetups'
      },
      {
        title: 'Profile',
        icon: 'mdi-account',
        link: 'Profile'
      },
      {
        title: 'Organize Meetup',
        icon: 'mdi-comment-edit',
        link: 'CreateMeetup'
      }
    ]
  }),
  watch: {
    group () {
      this.drawer = false
    }
  },
  computed: {
    isUserAuth () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push({ name: 'Home' })
    }
  },
  created () {

  }
}
</script>
