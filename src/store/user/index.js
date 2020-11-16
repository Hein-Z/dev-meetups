import firebase from 'firebase'

export default {
  state: {
    user: null,
    authErr: '',
    loading: false
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup ===
        payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setAuthErr (state, payload) {
      state.authErr = payload
    },
    unsetUser (state) {
      state.user = null
    },
    clearError (state) {
      state.authErr = ''
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    registerForMeetup ({ commit, getters }, payload) {
      const user = getters.getUser
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {
            id: payload,
            fbKey: data.key
          })
          commit('setRegisteredMeetup',
            {
              user: getters.getUser,
              meetups: getters.getMeetups
            })
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.getUser
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/')
        .child(fbKey)
        .set(null)
        .then(_ => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
          commit('setRegisteredMeetup',
            {
              user: getters.getUser,
              meetups: getters.getMeetups
            })
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', {
            id: user.user.uid,
            username: payload.username,
            registeredMeetups: [],
            fbKeys: {}
          })
          firebase.database().ref('users/' + user.user.uid)
            .set({ username: payload.username })
            .then(data => {
              commit('setLoading', false)
              commit('clearError')
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          commit('setAuthErr', err)
          commit('setLoading', false)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', {
            id: user.user.uid,
            registeredMeetups: [],
            fbKeys: {}
          })
          commit('setLoading', false)
          commit('clearError')
        })
        .catch(err => {
          commit('setAuthErr', err)
          commit('setLoading', false)
        })
    },
    fetchUserData ({ commit, getters }, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.getUser.id)
        .once('value')
        .then(data => {
          const dataPairs = data.val().registrations
          const registeredMeetups = []
          const swappedPairs = {}
          for (const key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.getUser.id,
            username: data.val().username,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
          commit('setRegisteredMeetup',
            {
              user: getters.getUser,
              meetups: getters.getMeetups
            })
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    logOut ({ commit }, payload) {
      firebase.auth().signOut().then(_ => {
        commit('unsetUser')
      }).catch(err => console.log(err.message))
    },
    clearErr ({ commit }) {
      commit('clearError')
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        username: payload.username,
        registeredMeetups: [],
        fbKeys: {}
      })
    }
  },
  getters:
    {
      getUser: state => state.user,
      getAuthErr: state => state.authErr
    }
}
