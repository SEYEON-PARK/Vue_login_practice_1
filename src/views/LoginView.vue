<template>
    <div class="login">
      <h3>Login</h3>
      <input type="text" v-model="email" placeholder="email"><br>
      <input type="password" v-model="password" placeholder="password"><br>
      <button v-on:click="login">로그인</button>
      <p>만약 계정이 없다면, <router-link to="/signup" id="bold">회원가입</router-link>을 먼저 진행해주세요!</p>
    </div>
</template>
  
  <script>

  import firebase from 'firebase/compat/app';
  // import loginStore from '@/store/loginStore';

  export default {
    name: 'LoginView', // 내 컴포넌트 이름
    components: {

    },
    data(){
        return {
            wantLogin: true
        }
    },
    methods:{
        login(){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            console.log(user + '로그인 완료!');
            this.$store.state.loginState=true;
            console.log(this.$store.state.loginState);
            /*
            // console.log(user.user.email);
            this.$store.email=user.user.email;
            const userId = user.user.uid;
            firebase.firestore().collection('users').doc(userId).get()
            .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              this.$store.age=userData;
              console.log('사용자 정보:', userData);
            } else {
              console.log('해당 사용자의 정보가 없음');
            }
          })
          .catch((error) => {
            console.error('사용자 나이 정보는 불러오기 실패', error);
          });
          */
            this.$router.push("/mypage");
        })
        .catch((err) => {
            alert('에러 : ' + err.message);
        });
      }   
    }
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
    #bold{
        font-size: 18px;
        color:rgb(63, 0, 122);
        cursor: pointer;
    }
  </style>