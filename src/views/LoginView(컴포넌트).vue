<template>
    <div class="login">
      <img alt="Vue logo" src="../assets/logo.png">
      <LoginComponent v-if="wantLogin" v-on:change="changeValue()"/>
      <SignUpComponent v-else v-on:change="changeValue()" />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import LoginComponent from '@/components/LoginComponent.vue' 
  import SignUpComponent from '@/components/SignUpComponent.vue' // 가져올 컴포넌트 이름
  
  export default {
    name: 'LoginView(컴포넌트)', // 내 컴포넌트 이름
    components: {
        LoginComponent,
        SignUpComponent // 가져올 컴포넌트 이름
    },
    data(){
        return {
            wantLogin: true
        }
    },
    methods:{
        changeValue(){
            this.wantLogin =!(this.wantLogin);
            console.log("변함 : " + this.wantLogin);
        }
    }
  }
  </script>
  