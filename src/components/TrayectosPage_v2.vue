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
              <div><strong>{{ dato.name+ " /"+dato.tracker_id }}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{"dato.actualTime"}}
                  </div>
              <div> {{ "En transito" }}
                <i  class="ubication bi bi-geo-alt-fill"></i>
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

                  <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: dato.porcentaje + '%' }"> 
                  {{ dato.porcentaje + " %" }}</div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ dato.end_label }}

                </div>

              </div>

              <div class="col header_status">
                <button type="button" class="btn btn-circle btn-xl d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <span class="tituloBola">{{ dato.etaRestante_duration }}</span>{{ unidad }}
                  <img class="etaBT" src="../assets/etaBola.png">
                </button>
                <div class="text-center" style="border-right:dashed #bcbab9; padding-right: 20px;">
                  <span style="font-size:14px; color: #bcbab9;">Restante</span>
                  <br>
                  <span>{{ dato.etaRestante_distance+ " KM" }} </span>
                </div>

                <div class="text-center">
                  <span style="font-size:14px; color: #bcbab9;">llegada </span>
                  <br>
                  <span>{{dato.etaRestante_duration }}</span>
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
import { ref } from 'vue';

import {  get_trayectos_v2 } from './DataConector.js'; 

import MapaPop from './MapaPop.vue';


let coordenadaMapa = ref({ lat: 0, lng: 0 })
let id_client=ref(0)
let hash=ref(0)

const trackers =ref( new Map())

let unidad = ref("min")

let removed=ref({
  message:"No Se guardaron los Datos",
  succed:false
})



let mapaShowing = ref(false)
let dataOut= ref()


if (window.$cookies.isKey('authorized')){
  id_client.value= window.$cookies.get('authorized').data.id_client
  hash.value=window.$cookies.get('authorized').hash

  try{
     window.$cookies.get('authorized').tracker.forEach(elemTrack=>{
      trackers.value.set(elemTrack.id, {id: elemTrack.id, label:elemTrack.label});
     })

  }catch(error){
    console.log(error)
  }
 
 
}


get_trayectos_v2( hash.value, id_client.value ).then(result=>{

  dataOut.value=result
})

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
