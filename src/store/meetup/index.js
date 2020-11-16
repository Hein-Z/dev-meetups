import firebase from 'firebase'

export default {
  state: {
    meetups: [],
    authErr: '',
    loading: false,
    currentMeetupsId: ''
  },
  mutations: {
    createMeetup (state, payload) {
      state.meetups.push(payload)
      state.currentMeetupsId = payload.id
    },
    updateMeetup (state, payload) {
      const meetup = state.meetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.place) {
        meetup.place = payload.place
      }
      if (payload.date && payload.time && payload.timestamp) {
        meetup.date = payload.date
        meetup.time = payload.time
        meetup.timestamp = payload.timestamp
      }
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadedMeetups (state, payload) {
      state.meetups = payload
    },
    deleteLoadedMeetupById (state, payload) {
      const meetups = state.meetups
      meetups.splice(meetups.findIndex(meetup => meetup.id ===
        payload), 1)
    }
  },
  actions: {
    loadMeetUps: function ({ commit, getters }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (const index in obj) {
            meetups.push({
              id: index,
              author_id: obj[index].author_id,
              author_name: obj[index].author_name,
              date: obj[index].date,
              time: obj[index].time,
              imageURL: obj[index].imageURL,
              description: obj[index].description,
              place: obj[index].place,
              title: obj[index].title,
              timestamp: obj[index].timestamp
            })
          }
          commit('setLoadedMeetups', meetups)

          commit('setCreatedMeetup', {
            user: getters.getUser,
            meetups: getters.getMeetups
          })
          commit('setLoading', false)
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    createMeetup: function ({ commit, getters }, payload) {
      commit('setLoading', true)
      const meetup = {
        author_id: payload.author_id,
        author_name: payload.author_name,
        date: payload.date,
        description: payload.description,
        place: payload.place,
        title: payload.title,
        time: payload.time,
        timestamp: payload.timestamp
      }
      let key
      let imageURL
      firebase.database().ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          const ref = firebase.storage().ref('meetups/' + key + ext)
          ref.put(payload.image)
            .then(_ => {
              ref.getDownloadURL()
                .then(url => {
                  imageURL = url
                  commit('createMeetup', {
                    ...meetup,
                    id: key,
                    imageURL: imageURL
                  })

                  commit('setCreatedMeetup', {
                    user: getters.getUser,
                    meetups: getters.getMeetups
                  })
                  firebase.database().ref('meetups')
                    .child(key).update({ imageURL: url })
                    .then(_ => {
                      commit('setLoading', false)
                    })
                }).catch(err => {
                  console.log('url_err', err)
                  commit('setLoading', false)
                })
            })
        })
        .catch(err => {
          console.log('firebase', err)
          commit('setLoading', false)
        })
    },
    updateMeetupsData ({ commit, getters }, payload) {
      commit('setLoading', true)
      const updateObj = {}

      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.place) {
        updateObj.place = payload.place
      }
      if (payload.date && payload.time && payload.timestamp) {
        updateObj.date = payload.date
        updateObj.time = payload.time
        updateObj.timestamp = payload.timestamp
      }
      return firebase.database().ref('meetups').child(payload.id)
        .update(updateObj).then(_ => {
          commit('setLoading', false)
          commit('updateMeetup', payload)

          commit('setCreatedMeetup', {
            user: getters.getUser,
            meetups: getters.getMeetups
          })
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    deleteMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      firebase.database().ref('meetups/' + payload)
        .set(null)
        .then(_ => {
          commit('setLoading', false)
          commit('deleteLoadedMeetupById', payload)
          commit('setCreatedMeetup', {
            user: getters.getUser,
            meetups: getters.getMeetups
          })
          commit('setRegisteredMeetup',
            {
              user: getters.getUser,
              meetups: getters.getMeetups
            })
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    }
  },
  getters:
    {
      getMeetups: state => state.meetups
        .sort((a, b) =>
          parseInt(a.timestamp) - parseInt(b.timestamp)
        ),
      getMeetupById: state => (id) => state.meetups.find(meetup => meetup.id === id),
      getCurMeetupId: state => state.currentMeetupsId
    }
}
