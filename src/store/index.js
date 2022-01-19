import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: "UserName",
    imageInfo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_8jyrBjic0ELBWNbA2JH7ufzOb3jkJvN8Q&usqp=CAU",
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    setImageInfo(state, info) {
      state.imageInfo = info;
    },
  },
  actions: {
    actionSetUserInfo({ commit }, info) {
      commit("setUserInfo", info);
    },
    actionSetImageInfo({ commit }, info) {
      commit("setImageInfo", info);
    },
  },
  modules: {},
});
