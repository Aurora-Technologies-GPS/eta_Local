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
  }else{
   window.location.replace("./");
 }
</script>