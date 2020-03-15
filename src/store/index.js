/**
 * Created by 39557 on 2020/3/13.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      console.log(state, user)
      state.Authorization = user;
      //localStorage.setItem('Authorization', user.Authorization);
    }
  }
});

export default store;

