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
    [types.SET_AUTH_ERROR](state, payload) {
      state.error = payload
    },
    [types.CLEAR_AUTH_ERROR](state) {
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
    [types.RESET_AUTH_ERROR]({commit}) {
      commit(types.CLEAR_AUTH_ERROR)
    },
    [types.CHANGE_PASSWORD](context, payload) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(context.getters.user.email, payload.existingPassword)
          .then((data) => {
            const user = firebase.auth().currentUser
            user.updatePassword(payload.newPassword)
              .then(() => { resolve() })
              .catch((error) => { context.commit(types.SET_AUTH_ERROR, error) })
          })
          .catch((error) => {
            context.commit(types.SET_AUTH_ERROR, error)
          })
      })
    },
    [types.SIGNUP]({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          commit(types.SET_USER, { id: data.uid, email: payload.email })
        })
        .catch((error) => {
          commit(types.SET_AUTH_ERROR, error)
        })
    },
    [types.SIGNIN]({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          commit(types.SET_USER, { id: data.uid, email: payload.email })
        })
        .catch((error) => {
          commit(types.SET_AUTH_ERROR, error)
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