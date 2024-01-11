<template>
    <div class="sign-up">
      <p>회원가입</p>
      <!--<input type="text" v-model="email" placeholder="email" @input="validateEmail"><br>-->
      <input type="text" v-model="email" placeholder="email">
      <span v-if="!isEmailValid">올바른 이메일 형식이 아닙니다.</span><br>
      <input type="password" v-model="password" placeholder="password" @input="validatePassword()">
      <span v-if="!isPasswordValid">비밀번호는 8~20자이며 영문자, 숫자, 특수문자를 포함해야 합니다.</span><br>
      <input type="number" v-model="age" placeholder="age"><br>
      <span v-if="!isNumeric">숫자만 입력하여 주세요.</span><br>
      <button v-on:click="signUp()">가입하기</button>
      <span>또는 <router-link to="/login" id="bold">로그인</router-link>으로 돌아가기</span>
    </div>
</template>
  
  <script>
  import firebase from 'firebase/compat/app';
  // import 'firebase/compat/auth';
  // import 'firebase/compat/firestore';
    export default {
      name: 'SignUpView',
      data() {
        return {
            email:'',
            password:'',
            age:'',
            isEmailValid: true,
            isPasswordValid: true
        }
      },
      methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isEmailValid = emailRegex.test(this.email);
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
            this.isPasswordValid = passwordRegex.test(this.password);
        },
        signUp(){
            this.validateEmail();
            this.validatePassword();
            if(this.isEmailValid && this.isPasswordValid){
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) =>{
                    // 사용자 생성 성공 시 user.user에 사용자 정보가 포함됩니다.
                    const userInfo = user.user;
                    const additionalData = {
                        age: this.age,
                        // 다른 필요한 정보들...
                    };
                    firebase.firestore().collection('users').doc(userInfo.uid).set(additionalData)
                        .then(() => {
                            alert(user + '회원가입 및 추가 정보 저장 완료!');
                            this.email='';
                            this.password='';
                            this.age='';
                        })
                        .catch((error) => {
                            alert('firestore() 에러: ' + error.message);
                        });
                    })
                    .catch((err)=>{
                        alert('에러 : '+ err.message);
                    });
            }
            else{
                alert("형식에 맞게 작성해주세요.");
            }
        }
      },
      computed: {
        isNumeric() {
            // 숫자인지 여부를 확인하는 computed 속성
            return !isNaN(Number(this.age));
        }
  },
    }
  </script>
  
  <style scoped>
    .signUp {
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
      font-size: 20px;
    }
    span {
      display: block;
      margin-top: 20px;
      font-size: 15px;
    }
    #bold{
        font-size: 18px;
        color:rgb(63, 0, 122);
        cursor: pointer;
    }
  </style>