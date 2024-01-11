<template>
    <div class="login">
      <h3>Login</h3>
      <input type="text" v-model="email" placeholder="email"><br>
      <input type="password" v-model="password" placeholder="password"><br>
      <button>로그인</button>
      <p>만약 계정이 없다면, <span id="bold" v-on:click.stop="$emit('change')">회원가입</span>을 먼저 진행해주세요!</p>
    </div>
  </template>
  
  <script>
    export default {
      name: 'LoginComponent',
      data() {
        return {
            email:'',
            password:''
        }
      },
      methods: {}
    }
  </script>
  
  <style scoped>
    .login {
      margin-top: 40px;
    }
    input {
      margin: 10px 0;
      width: 20%;
      padding: 15px;
    }
    button {
      margin-top: 20px;
      width: 10%;
      cursor: pointer;
    }
    p {
      margin-top: 40px;
      font-size: 15px;
    }
    p a {
      text-decoration: underline;
      cursor: pointer;
    }
    span#bold{
        font-size: 18px;
        color:rgb(63, 0, 122);
        cursor: pointer;
    }
  </style>