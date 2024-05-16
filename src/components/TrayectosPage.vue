<template>
  <div>


    <div v-show="mapaShowing" class="popContainer">

      <div style="position: relative; text-align: left;">
        <strong><i @click="hidePop()" style="position: absolute; top: 5px; right: 10px;"
            class="bi bi-x-lg"></i></strong>
      </div>
      <div style="margin-top: 5%; width: 100%">
        <MapaPop v-if="mapaShowing" :coordenadas="coordenadaMapa" />
      </div>

    </div>

<div v-show="removed.succed" class="popContainer">
  <h1 class="text-center" style="margin-top: 20%; color: green;">{{removed.message}}</h1>
</div>


    <div class="container">


      <h1 class="text-center">Tiempo y distancia estimada de llegada</h1>

<div style="display: flex; margin: 15px;">
<h3>Nuevo Trayecto</h3>

<router-link to="/add">
    <button style="border-radius: 50%; margin-left: 5px;" type="button" class="btn btn-primary">
        <i class="bi bi-plus-lg"></i>
    </button>

</router-link>
</div>

      <div v-for=" (dato, index) in dataOut" :key="index">


        <div class="card">
          <div class="card-header" :class="{ important: dato.important }">

        <button style="float: right; border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="dropdown-menu" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a @click="hide_trayecto(dato.id)" class="dropdown-item" href="#">Ocultar Trayecto</a>
        </div>

            <div class="header_status">
              <div><strong>{{ dato.name+ " /"+get_tracker_Label(dato.tracker_id) }}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{"dato.actualTime"}}
                  </div>
              <div> {{ evaluarEstatus(dato.porcentaje, dato.id,dato.complete, dato.etaRestante[0].distance) }}
                <i @click="showPop(dato.actual_Location)" class="ubication bi bi-geo-alt-fill"></i>
              </div>

            </div>






          </div>
          <div class="card-body">
            <div class="row" style="height: auto">

              <div class=" col-lg-8 col-xl-9 col-md-7 col-sm-8 col-8 "
                style=" position: relative; margin-top: auto; margin-bottom: auto;">
                <div class="col-12" style="font-size:14px; color: #bcbab9;">
                  {{ dato.start_label }}

                </div>
                <div class="progress " role="progressbar" aria-label="Example with label" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100">
      
                  <div class="estado d-xl-block d-lg-block  d-md-block d-sm-none d-none">

                    {{"activo: "+dato.actualTime }}
                  </div>

                  <div class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{ width: evaluarporcentaje(dato.porcentaje) + '%' }">{{ evaluarporcentaje(dato.porcentaje) + " %" }}</div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ dato.end_label }}

                </div>

              </div>

              <div class="col header_status">
                <button type="button" class="btn btn-circle btn-xl d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <span class="tituloBola">{{ convertirTiempo(dato.etaRestante[0].duration)}}</span>{{ unidad }}
                  <img class="etaBT" src="../assets/etaBola.png">
                </button>
                <div class="text-center" style="border-right:dashed #bcbab9; padding-right: 20px;">
                  <span style="font-size:14px; color: #bcbab9;">Restante</span>
                  <br>
                  <span>{{ distance_kilomentros(dato.etaRestante[0].distance)  + " KM" }} </span>
                </div>

                <div class="text-center">
                  <span style="font-size:14px; color: #bcbab9;">llegada </span>
                  <br>
                  <span>{{ llegada(dato.etaRestante[0].duration) }}</span>
                </div>



              </div>

            </div>

          </div>

        </div>
        <br>
      </div>


    </div>



  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';

import { get_trips, hide_trip } from './manager.js'

import { completar_trayecto } from './DataConector.js'; 

import MapaPop from './MapaPop.vue';

let caruselLineTime=ref()

let coordenadaMapa = ref({ lat: 0, lng: 0 })
let id_client=ref(0)
const trackers =ref( new Map())

let unidad = ref("min")

let removed=ref({
  message:"No Se guardaron los Datos",
  succed:false
})



let mapaShowing = ref(false)
let dataOut= ref({ usuario: {}, viajes: [] })


if (window.$cookies.isKey('authorized')){
  id_client.value= window.$cookies.get('authorized').data.id_client

  try{
     window.$cookies.get('authorized').tracker.forEach(elemTrack=>{
      trackers.value.set(elemTrack.id, {id: elemTrack.id, label:elemTrack.label});
     })

  }catch(error){
    console.log(error)
  }
 
 
}

onMounted(()=>{

  //obtener lista Trayectos
  get_trips(id_client).then(result=>{

  dataOut.value=result

})

  caruselLineTime.value=setInterval(()=>{

   get_trips(id_client).then(result=>{

  dataOut.value=result

})

 },11500)

})


function get_tracker_Label(tracker_id){
  try{
    return trackers.value.get(tracker_id).label
  }catch{
    return " "
  }


 
}

//ocultar trayecto
function hide_trayecto(id){

  hide_trip(id).then(result=>{

    if (result) {
      removed.value.succed=result

    if (result.changedRows>0) {
      removed.value.message="Guardado Correctamente"

    }else{
       removed.value.message="Ocurrio Un Error al Guardar"
    }
    
    setTimeout(()=>{
       window.location.replace("./");
    },2000)

    }
  })

}

function showPop(coor) {
  coordenadaMapa.value = coor
  mapaShowing.value = true
}

function hidePop() {
  mapaShowing.value = false
}

function convertirTiempo(segundos) {
  let salida

  salida = Math.round(segundos / 60) || 0
  unidad.value = "min"

  if (salida >= 60) {
    unidad.value = "hrs"
    salida = (salida / 60).toFixed(1)

  }

  return salida

}


function llegada(segundos){

  let manana=new Date(new Date().getTime()+segundos*1000)
  manana=manana.toLocaleTimeString('en-US')

  return manana

}

function distance_kilomentros(distance) {
  let salida=(distance/1000).toFixed(2) || 0

  return salida

}

function evaluarporcentaje(porcet){
  let porc=porcet

  if(porc<0)
    porc=0
  return porc
}


function evaluarEstatus( porcet, id,complete, distanciarestante){
  let outLabelStatus= "En Trasito"

  if (complete) {
    return "llego"


  }else{
     

    if (porcet<0) {
      outLabelStatus="Fuera de Ruta"

    }
    if  (distanciarestante<1000) {


    outLabelStatus="Llegando"

    completar_trayecto(id).then(result => console.log(result))
    }
  }
  return outLabelStatus

}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Truculenta:opsz,wght@12..72,100..900&display=swap');

.btn-circle.btn-xl {
  width: auto;
  height: 100%;
  border-radius: 50%;
  font-size: 12px;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: #606060;
  color: white;
}

.tituloBola {
  font-size: 40px;
  font-family: "Truculenta", sans-serif;
  font-weight: bold;

}
.important{
  background-color:pink;
}

.etaBT {
  position: absolute;
  right: 8px;
  bottom: -5px;
  width: 31%;
  max-width: 40px
}

.login {
  text-align: center;


}

.ubication:hover {
  cursor: pointer;
}

@media (max-width: 1230px) {
  .btn-circle.btn-xl {
    width: auto;
    height: 80%;
    margin-top: 10%;
    margin-bottom: 10%;
  }

  .tituloBola {
    font-size: 20px;
  }

  .etaBT {
    position: absolute;
    right: 38px;
    bottom: -5px;
    width: 50%;
    max-width: 50px
  }

}

@media (max-width: 730px) {
  .btn-circle.btn-xl {
    width: auto;
    height: 70%;
    margin-top: 20%;
    margin-bottom: 20%;
  }

  .tituloBola {
    font-size: 20px;
  }

  .etaBT {
    position: absolute;
    right: 30px;
    bottom: -5px;
    width: 50%;
    max-width: 50px
  }

}

.card {
  box-shadow: rgba(0, 0, 0, 0.49) 5px 0px 9px 0px;
}


.estado {
  position: absolute;
  top: 0px;
  left: 40%;
}

.header_status {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.header_status strong {
  float: left;
}

.popContainer {
  /* background-color: #1e1f24; */
  background-color: white;
  position: absolute;
  /* color: white; */
  color: black;
  width: 50%;
  min-height: 50%;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}
</style>
