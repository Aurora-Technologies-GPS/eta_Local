<template>
<iframe
  id="hola"
  class="trackerMap"
  src="https://maps.google.com/maps?q=18.4574411,-69.9278577&hl=es&z=14&amp;output=embed"
  
 >
</iframe>
</template>
<script setup>

import { onMounted, defineProps } from 'vue'

let props =defineProps({
  coordenadas: Object 
})

console.log(props.coordenadas)

// let coordenadaMapa=ref( {lat: 18.48596, lng: -70.00089166666666})


onMounted(async () => {

let link=`https://maps.google.com/maps?q=${ props.coordenadas.lat},${ props.coordenadas.lng}&hl=es&z=15&t=m`;
let mapa=document.getElementById('hola');

mapa.removeAttribute("src");
let url = link + "&output=embed";
mapa.setAttribute("src",url);

})
</script>


<style scoped>

.trackerMap{
	width:100%;
	height:385px;
	border:none;
 
}


</style>