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
              <div><strong>{{ dato.name }}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{"dato.actualTime"}}
                  </div>
                  <!-- "evaluarEstatus(dato.estatus, dato.porcentaje)" -->
              <div> {{ "En Transito" }}<i @click="showPop(dato.actual_Location)" class="ubication bi bi-geo-alt-fill"></i>
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
                  <!-- dato.porcentaje 60-->
                  <div class="estado d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <!--   "dato.actualTime" -->
                    {{"activo: "+ new Date().toLocaleString()}}
                  </div>

                  <div class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{ width: 50 + '%' }">{{ 50 + " %" }}</div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ dato.end_label }}

                </div>

              </div>

              <div class="col header_status">
                <button type="button" class="btn btn-circle btn-xl d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <span class="tituloBola">{{ 50 }}</span>{{ unidad }}
                  <img class="etaBT" src="../assets/etaBola.png">
                </button>
                <div class="text-center" style="border-right:dashed #bcbab9; padding-right: 20px;">
                  <span style="font-size:14px; color: #bcbab9;">Restante</span>
                  <br>
                  <span>{{ 25 + " KM" }} </span>
                </div>

                <div class="text-center">
                  <span style="font-size:14px; color: #bcbab9;">llegada </span>
                  <br>
                  <span>{{ 26 }}</span>
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

import { get_trayectos, ocultar_trayecto } from './DataConector.js';

import MapaPop from './MapaPop.vue';


/*let details=ref({})

let coordenadaMapa = ref({ lat: 0, lng: 0 })*/

//import { data } from './DataConector.js'; //combo  route_Ways,osrm,

let id_client=ref(0)

if (window.$cookies.isKey('authorized')){

  id_client.value= window.$cookies.get('authorized').id_client

 
}

let unidad = ref("min")

let removed=ref({
  message:"No Se guardaron los Datos",
  succed:false
})

//let carusel=ref();

let mapaShowing = ref(false)
let dataOut= ref({ usuario: {}, viajes: [] })


function hide_trayecto(id){

  ocultar_trayecto(id).then(result=>{

    console.log(result)

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

get_trayectos(id_client).then(result=>{
       // console.log(result)
        dataOut.value=result
})

function showPop(coor) {
  // coordenadaMapa.value = coor

  console.log(coor)
  mapaShowing.value = true
}
/*
function hidePop() {
  mapaShowing.value = false
}

const parametros={
    tracker_id:689130,
    from:new Date(2024, 2, 25, 10, 15, 0, 0).toISOString(),
    to:new Date(2024, 2, 25, 12, 30, 0, 0).toISOString()
}

let origen= '-69.638386,18.428805'
let destino= '-70.00060333333333,18.485558333333334'

let eta_osrm

details.value.parametros=(parametros)
details.value.trayecto=({origen,destino})

let temp=ref("klkjd")
let loca=0

async function trackers_state(lat, lng){
  let output=lng+','+lat
  return output
}

route_Ways(parametros.tracker_id, parametros.from, parametros.to).then(wayroutes=>{
if (wayroutes) {
  temp.value=wayroutes.list;
  let countMax=wayroutes.list.length

  details.value.countMax=countMax

  osrm(origen,destino).then(osrm=>{
   if(osrm){
    eta_osrm=osrm

carusel.value =setInterval(()=>{
    loca=loca+1;
    if(loca>=countMax){ 
      loca=0      
    } 
     update(loca);
},1000)
   }
  
  })

}

});

function update(tim){

data("noelito").then(resDB=>{
    if(resDB){
        
        try{

          if(resDB){
          resDB.viajes.forEach((element) => {

            trackers_state(temp.value[tim].lat,temp.value[tim].lng).then(actual_Locat=>{                 
                  osrm(actual_Locat,destino).then(actual_eta_osrm=>{
                    if(actual_eta_osrm){

                  
let salida= ((((eta_osrm.routes[0].distance)-(actual_eta_osrm.routes[0].distance))*100)/eta_osrm.routes[0].distance).toFixed(2)

console.log("***")
console.log(eta_osrm.routes[0].distance)
console.log(actual_eta_osrm.routes[0].distance)
console.log("***")
if(salida>100){
  salida=100
}else if(salida<0){
  salida=0
}
dataOut.value={usuario:"test",viajes:[]}

details.value.eta=eta_osrm.routes
details.value.etaRestante=actual_eta_osrm.routes
details.value.actual_Locatation=actual_Locat

dataOut.value.viajes.push({
  id: element.id,
  tracker_id: element.tracker_id,
  titulo: element.titulo,
  origen: element.origen,
  destino: element.destino,
  estatus: element.estatus,
  start: element.start,
  end: element.end,
  actual_Location:{ lat: temp.value[tim].lat, lng: temp.value[tim].lng },
  actualTime:temp.value[tim].get_time,
  eta: eta_osrm.routes,
  etaRestante:actual_eta_osrm.routes,
  porcentaje:salida
                 })
   
                }
              })
            })
          })

          // console.log(details.value)
          // console.log(dataOut.value)
 
        }

        }catch(err){
          console.log(err)
        }
           
    }
})


}

update();

// setInterval(()=>{
//   // console.log("se Actualizo")
//   update()
// }, 19000)


function evaluarEstatus(labelestatus, porcet){

 let outLabelStatus= labelestatus

  if(porcet>95){

    outLabelStatus="Llego"

  }

  return outLabelStatus

}

function convertirTiempo(segundos) {
  let salida

  salida = Math.round(segundos / 60)
  unidad.value = "min"

  if (salida >= 60) {
    unidad.value = "hrs"
    salida = (salida / 60).toFixed(1)

  }

  return salida

}

function getTiempoLlegada(tiempoViaje, tiempoActual) {

//fake date

  //let tiempoLlegada = new Date
let tiempoLlegada=new Date(tiempoActual)
  tiempoLlegada = new Date(tiempoLlegada.getTime() + tiempoViaje * 1000)

  return tiempoLlegada

}*/
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
