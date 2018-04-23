import * as firebase from 'firebase'

export default {
  state: {
    error: null
  },
  getters: {
    authError(state) {
      return state.error
    },
    hasAuthError(state) {
      return state.error !== null && state.error !== undefined
    }

  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  actions: {
    RESET_SIGNUP({commit}) {
      commit('CLEAR_ERROR')
    },
    SIGNUP({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {

        })
        .catch((error) => {
          commit("SET_ERROR", error)
        })
    }
  }
}