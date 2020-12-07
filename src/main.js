import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import firebase from 'firebase'
import vuetify from './plugins/vuetify'
import Alert from './components/share/Alert'
import EditMeetupsDialog from '@/components/Edit/EditMeetupsDialog'
import EditMeetupsDate from '@/components/Edit/EditMeetupsDate'
import EditMeetupsTime from '@/components/Edit/EditMeetupsTime'
import RegisterDialog from '@/components/Registeration/RegisterDialog'
import DeleteMeetups from '@/components/Delete/DeleteMeetupsDialog'

Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('edit-meetups-dialog', EditMeetupsDialog)
Vue.component('edit-meetups-date', EditMeetupsDate)
Vue.component('edit-meetups-time', EditMeetupsTime)
Vue.component('register-dialog', RegisterDialog)
Vue.component('delete-meetups-dialog', DeleteMeetups)

const config = {
  apiKey: 'AIzaSyAOclYBSZJKCdDlfYU6c5N9QiK2cJFKHpE',
  authDomain: 'meetups-2-2.firebaseapp.com',
  databaseURL: 'https://meetups-2-2.firebaseio.com',
  projectId: 'meetups-2-2',
  storageBucket: 'meetups-2-2.appspot.com',
  messagingSenderId: '897479011108',
  appId: '1:897479011108:web:b3d1e0ee7b57ec3e3ea1b1',
  measurementId: 'G-5ZWFFWHQMQ'
}
let app = null
firebase.initializeApp(config)
firebase.analytics()
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      store,
      vuetify,
      render: h => h(App),
      created () {
        this.$store.dispatch('loadMeetUps')
        if (user) {
          this.$store.dispatch('autoSignIn', user)
          this.$store.dispatch('fetchUserData')
        }
      },
      router
    }).$mount('#app')
  }
})
