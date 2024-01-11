<template>
    <div class="mypage">
      <h3>내 정보</h3>
      <p>이메일 : {{ userOrigin.email }}</p>
      <p>나이 : {{ userOther.age }}</p>
    </div>
</template>
  
  <script>
 

  export default {
    name: 'MyPage', // 내 컴포넌트 이름
    data(){
        return {
          // 그냥 store에 저장 -> 1회성
          // userOrigin : this.$store.state.user,
          // userOther : this.$store.state.other

          /*
          // 세션 스토리지에 저장 -> 같은 브라우저, 같은 창일 경우 가능!
          userOrigin : JSON.parse(sessionStorage.getItem('userOrigin')),
          userOther : JSON.parse(sessionStorage.getItem('userOther')),
          */

          userOrigin : JSON.parse(localStorage.getItem('userOrigin')),
          userOther : JSON.parse(localStorage.getItem('userOther')),
        }
    },
    async beforeMount() {
        await this.$store.dispatch('fetchUser');
        console.log(localStorage);
        // console.log(this.$store.state.user);
        // console.log(this.$store.state.other);
    },
    /*
    watch: {
    // 사용자 정보를 감시
    '$store.state.user': {
      handler() {
        // 사용자 정보가 변경될 때마다 컴포넌트를 다시 렌더링
        this.$forceUpdate();
      },
      deep: true,
    },
  },
  */
  
    methods:{
       
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