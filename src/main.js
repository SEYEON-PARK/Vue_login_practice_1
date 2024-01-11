// require('dotenv').config();

import { createApp } from 'vue'
// import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
// import the createStore method
import { createStore } from 'vuex'


// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};
console.log(process.env)
console.log('VUE_APP_FIREBASE_API_KEY:', process.env.VUE_APP_FIREBASE_API_KEY);
console.log('VUE_APP_FIREBASE_AUTH_DOMAIN:', process.env.VUE_APP_FIREBASE_AUTH_DOMAIN);
console.log('VUE_APP_FIREBASE_PROJECT_ID:', process.env.VUE_APP_FIREBASE_PROJECT_ID);
// ... 기타 환경 변수

/*
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};
*/

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// configure the store
const store = createStore({
  state() {
    return {
      user: '', // null로 하면 오류남. 왜 그런지 정확히 알고 싶음.
      other:'',
      authReady:false,
      loginState: false,
      isListenerAttached : false
    }
  },
  mutations: { // commit()으로 실행
    setUser(state, {user, userData}) {
      // state.user = user;
      // state.other = userData;
      // console.log(this.state.user+'완료!')
      // console.log(this.state.other.age+'완료!')

      /* // 이렇게 하니까 이전 정보가 sessionStorage에 남아서 다시 로그인해도 새로고침해야만 바뀐다.
      sessionStorage.setItem('userOrigin', JSON.stringify(user));
      sessionStorage.setItem('userOther', JSON.stringify(userData));
      */

      /*
      // 세션 스토리지는 같은 브라우저, 같은 창에서만 공유되는 데이터다. 같은 브라우저, 다른 창에서도 공유하고 싶다면 localStorage를 써라.
      if (user) {
        // 사용자 정보가 있는 경우에만 접근
        if (user.email) {
          // user 객체가 email 속성을 가지고 있는 경우에만 처리
          console.log('사용자 이메일:', user.email);
        }
  
        // 세션 스토리지에 로그인 정보 저장
        sessionStorage.setItem('userOrigin', JSON.stringify(user));
        sessionStorage.setItem('userOther', JSON.stringify(userData));
      } else {
        // 사용자가 로그아웃하는 경우 세션 스토리지에서 정보 제거
        sessionStorage.removeItem('userOrigin');
        sessionStorage.removeItem('userOther');
      }
      */

      if (user) {
        // 사용자 정보가 있는 경우에만 접근
        state.user=user;
        state.userData=userData;
        if (user.email) {
          // user 객체가 email 속성을 가지고 있는 경우에만 처리
          console.log('사용자 이메일:', user.email);
        }
  
        // 로컬 스토리지에 로그인 정보 저장
        localStorage.setItem('userOrigin', JSON.stringify(user));
        localStorage.setItem('userOther', JSON.stringify(userData));
      } else {
        // 사용자가 로그아웃하는 경우 로컬 스토리지에서 정보 제거
        localStorage.removeItem('userOrigin');
        localStorage.removeItem('userOther');
        console.log(JSON.parse(localStorage.getItem('userOther')));
      }
    
    },
    /*
    setAuthReady(state, value) {
      state.authReady = value;
    },
    */
    
  },
  actions: { // dispatch()로 실행
    async fetchUser({ commit }) {
      if (!this.isListenerAttached) {
        this.isListenerAttached = true;
        return new Promise((resolve) => {
          firebase.auth().onAuthStateChanged((user) => {
            const isUserChanged = JSON.stringify(this.state.user) !== JSON.stringify(user);
            if(isUserChanged){
              console.log(user);
              const userId = user.uid;
              firebase.firestore().collection('users').doc(userId).get()
              .then((doc) => {
                if (doc.exists) {
                  const userData = doc.data();
                  commit('setUser', {user, userData});
                  console.log('사용자 정보:', userData);
                } else {
                  commit('setUser', {user});
                  console.log('해당 사용자의 나이 정보가 없음');
                }
              })
              .catch((error) => {
                console.error('사용자 나이 정보 불러오기 실패', error);
              });
              // commit('setAuthReady', true);
              resolve(user);
            }
          });
        });
      }
    },
  },
});


createApp(App).use(router).use(store).mount('#app') // 라우터

// export{auth};