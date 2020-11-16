
export default {
  state: {
    loading: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  getters:
    {
      getLoading: state => state.loading
    }
}
