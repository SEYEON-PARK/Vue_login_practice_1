
/*
// Vuex 스토어 파일 (store.js)

import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    age: 0,
    email: '', // 이메일 속성 추가
  },
  mutations: {
    setUser(state, user, userData) {
      state.user = user;
      state.age = userData;
      state.email = user ? user.email : ''; // 로그인된 사용자가 있을 경우에만 이메일 설정
    },
  },
  actions: {
    async fetchUser({ commit }) {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          const userId = user.uid;
          firebase.firestore().collection('users').doc(userId).get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              commit('setUser', user, userData);
              console.log('사용자 정보:', userData);
            } else {
              commit('setUser', user);
              console.log('해당 사용자의 정보가 없음');
            }
          })
          .catch((error) => {
            console.error('사용자 정보 불러오기 실패', error);
          });
          resolve(user);
        });
      });
    },
  },
});
*/


/*
// Vuex 스토어 파일 (store.js)
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    age:0
  },
  mutations: {
    setUser(state, {user, userData}) {
      state.user = user;
      state.age = userData;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          const userId = user.uid;
          firebase.firestore().collection('users').doc(userId).get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              commit('setUser', {user, userData});
              console.log('사용자 정보:', userData);
            } else {
              commit('setUser', {user});
              console.log('해당 사용자의 정보가 없음');
            }
          })
          .catch((error) => {
            console.error('사용자 정보 불러오기 실패', error);
          });
          resolve(user);
        });
      });
    },
  },
});
*/