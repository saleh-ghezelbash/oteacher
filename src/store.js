import { createStore } from 'vuex'
import router from './router';

const store = createStore({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null,
    isFavorite: false,
    favoriteMovies: []
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getIsFavorite(state) {
      return state.isFavorite;
    },
    getFavoriteMovies(state) {
      return state.favoriteMovies;
    }
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
    },
    updateIsFavoriteToFalse(state) {
      state.isFavorite = false;
    },
    updateIsFavoriteToTrue(state) {
      state.isFavorite = true;
    },
    updateFavoriteMovies: (state, favoriteMovies) => {
      state.favoriteMovies = favoriteMovies;
    },
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
    },

    doAddToFavorites({ commit }, movie) {
      const favoritesString = localStorage.getItem('favorites');
      const favoritesArray = JSON.parse(favoritesString);
      if (!favoritesArray.find(f => f.id == movie.id)) {
        favoritesArray.push(movie)
      }
      localStorage.setItem('favorites', JSON.stringify(favoritesArray))

      commit('updateFavoriteMovies', favoritesArray);
    },

    doRemoveFromFavorites({ commit }, movie) {
      const favoritesString = localStorage.getItem('favorites');
      const favoritesArray = JSON.parse(favoritesString);
      const filteredFavoritesArray = favoritesArray.filter(m => m.id != movie.id);
      localStorage.setItem('favorites', JSON.stringify(filteredFavoritesArray))

      commit('updateFavoriteMovies', filteredFavoritesArray);
    },

    doGetFavoriteMovies({ commit }){
      const favoritesString = localStorage.getItem('favorites');
      const favoritesArray = JSON.parse(favoritesString);

      commit('updateFavoriteMovies', favoritesArray);
    }
  }
})

export default store;