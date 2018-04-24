import * as firebase from 'firebase'

export default {
  state: {
    error: null,
    user: null
  },
  getters: {
    authError(state) {
      return state.error
    },
    hasAuthError(state) {
      return state.error !== null && state.error !== undefined
    },
    isUser(state) {
      return state.user !== null && state.user !== undefined
    }
  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    SET_USER(state, payload) {
      console.log("Setting user " + payload)
      state.user = payload
    },
    CLEAR_USER(state) {
      state.user = null
    }
  },
  actions: {
    RESET_SIGNUP({commit}) {
      commit('CLEAR_ERROR')
    },
    SIGNUP({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          console.log(data)
          commit('SET_USER', { id: data.uid, email: payload.email })
        })
        .catch((error) => {
          commit("SET_ERROR", error)
        })
    },
    SIGNOUT({commit}) {
      commit("CLEAR_USER")
    }
  }
}