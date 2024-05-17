<template>
<div>
  <NavHeader />
<!--   <TrayectosPage /> -->
  <TrayectosPage_v2 />
</div>

</template>
<script setup>
  import NavHeader from './NavHeader.vue';
  //import TrayectosPage from './TrayectosPage.vue';
  import TrayectosPage_v2 from './TrayectosPage_v2.vue';


  if (window.$cookies.isKey('authorized')){
    console.log("bienvenido")
  }else if(!window.$cookies.isKey('authorized')){
    setTimeout(()=>{
      window.location.replace("./");
    },2000)


 }
</script>