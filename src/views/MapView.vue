<template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Map"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'MapView', // 내 컴포넌트 이름
    components: {
      HelloWorld // 가져올 컴포넌트 이름
    }
  }
  </script>
  