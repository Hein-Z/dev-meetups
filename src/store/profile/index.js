export default {
  state: {
    profile: {
      createMeetups: [],
      registeredMeetups: []
    }
  },
  mutations: {
    setCreatedMeetup (state, payload) {
      const meetups = payload.meetups
      const userId = payload.user.id
      const createdMeetups = meetups.filter(meetup => meetup.author_id === userId)
      state.profile.createMeetups = createdMeetups
    },
    setRegisteredMeetup (state, payload) {
      const meetups = payload.meetups
      const registeredMeetupIds = payload.user.registeredMeetups
      const registeredMeetup = []
      if (registeredMeetupIds !== []) {
        registeredMeetupIds.forEach(registeredMeetupId => {
          const meetupTemp = meetups.find(meetup => meetup.id === registeredMeetupId)
          if (meetupTemp) {
            registeredMeetup.push(meetupTemp)
          }
        })
      }
      state.profile.registeredMeetups = registeredMeetup
    }
  },
  actions: {
    loadRegisteredMeetup ({ commit, getters }) {
      commit('setRegisteredMeetup', {
        user: getters.getUser,
        meetups: getters.getMeetups
      })
    },
    loadCreatedMeetup ({ commit, getters }) {
      commit('setCreatedMeetup', {
        user: getters.getUser,
        meetups: getters.getMeetups
      })
    }
  },
  getters:
    {
      getCreatedMeetups: state => {
        return state.profile.createMeetups
          .sort((a, b) =>
            parseInt(a.timestamp) - parseInt(b.timestamp)
          )
      },
      getRegisteredMeetups: state => {
        return state.profile.registeredMeetups
          .sort((a, b) =>
            parseInt(a.timestamp) - parseInt(b.timestamp)
          )
      },
      getNotifications: state => {
        return parseInt(state.profile.createMeetups.length) + parseInt(state.profile.registeredMeetups.length)
      }
    }

}
