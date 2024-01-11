<template>
  <nav>
    <div>
      <router-link to="/">Home</router-link> |
      <span v-if="!loginState"><router-link to="/login">Login</router-link> | </span>
      <span v-if="!loginState" @click="logout"><router-link to="/login">Logout</router-link> |</span>
      <router-link to="/weather">Weather</router-link> |
      <router-link to="/map">Map</router-link> 
    </div>
  </nav>
  <router-view/>
</template>

<script>

import firebase from 'firebase/compat/app';
import 'firebase/auth';

export default {
  name: 'App',
  data(){
    return {
        loginState:this.$store.state.loginState
    }
  },
  methods : {
    logout(){
      this.$store.state.loginState=false;
      firebase.auth().signOut()
    .then(() => {
      // 로그아웃 성공 시 처리할 코드
      console.log('로그아웃 성공');
      // 사용자가 로그아웃하는 경우 로컬 스토리지에서 정보 제거
      localStorage.removeItem('userOrigin');
      localStorage.removeItem('userOther');
      console.log(localStorage);
      console.log(JSON.parse(localStorage.getItem('userOther')));
    })
    .catch((error) => {
      // 로그아웃 실패 시 처리할 코드
      console.error('로그아웃 실패', error);
    });
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: antiquewhite;
  padding: 10px;
  text-align: left;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
