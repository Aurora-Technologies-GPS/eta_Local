<template>
<div>
  <NavHeader />
  <TrayectosPage />
</div>

</template>
<script setup>
  import NavHeader from './NavHeader.vue';
  import TrayectosPage from './TrayectosPage.vue';

  if (window.$cookies.isKey('authorized')){
    console.log("bienvenido")
  }else if(!window.$cookies.isKey('authorized')){
    setTimeout(()=>{
      window.location.replace("./");
    },2000)


 }
</script>