import * as firebase from 'firebase'
import * as types from './mutation-types'

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
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    [types.SET_ERROR](state, payload) {
      state.error = payload
    },
    [types.CLEAR_ERROR](state) {
      state.error = null
    },
    [types.SET_USER](state, payload) {
      state.user = payload
    },
    [types.CLEAR_USER](state) {
      state.user = null
    }
  },
  actions: {
    RESET_SIGNUP({commit}) {
      commit(types.CLEAR_ERROR)
    },
    [types.SIGNUP]({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          console.log(data)
          commit(types.SET_USER, { id: data.uid, email: payload.email })
        })
        .catch((error) => {
          commit(types.SET_ERROR, error)
        })
    },
    [types.SIGNIN]({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          console.log(data)
          commit(types.SET_USER, { id: data.uid, email: payload.email })
        })
        .catch((error) => {
          console.log(error)
          commit(types.SET_ERROR, error)
        })
    },
    [types.AUTO_SIGNIN]({commit}, payload) {
      commit(types.SET_USER, { id: payload.uid, email: payload.email })
    },
    [types.SIGNOUT]({commit}) {
      firebase.auth().signOut()
      commit(types.CLEAR_USER)
    }
  }
}