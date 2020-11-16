import Vue from 'vue'
import Vuex from 'vuex'
import meetup from './meetup'
import user from './user'
import loading from './share'
import profile from './profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetup,
    user,
    loading,
    profile
  }
})
