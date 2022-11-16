import { createStore } from 'vuex'
import router from './router';

const store = createStore({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      try {
        localStorage.setItem('accessToken', "user-info");
        if (!localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', JSON.stringify([]));
        }
        commit('loginStop', null);
        commit('updateAccessToken', loginData);
        router.push('/items');
      } catch (error) {
        commit('loginStop', error.message);
        commit('updateAccessToken', null);
      }
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      commit('logout');
      router.push('/login');
    }
  }
})

export default store;