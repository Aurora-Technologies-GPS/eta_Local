
<template>
<div>

<div v-show="saved.succed" class="popContainer">
  <h1 class="text-center" style="margin-top: 20%; color: green;">{{saved.message}}</h1>
</div>

  <NavHeader />
    <div class="container mt-5">
    <form @submit.prevent="enviar" >

  <div class="form-row">
    <div class="form-group col-md-6">
      <strong><label for="inputName">Nombre</label></strong>
      <input v-model="adding.name" type="text" class="form-control" id="inputName" required>

    </div>
    <div class="form-group col-md-6">
      <strong><label for="inputDestino">Description</label></strong>
        <input v-model="adding.description" type="text" class="form-control" id="inputName" >
    </div>
  </div>
        <div class="form-row">
    <div class="form-group col-md-3">
      <strong><label for="inputDestino">ORIGEN</label></strong>
      <select v-model="adding.start" id="inputDestino" class="form-control" required>

      <option :value="dato" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato}}
      </option>

      </select>
    </div>
        <div class="form-group col-md-3">
      <strong><label for="inputDestino">DESTINO</label></strong>
      <select v-model="adding.end" id="inputDestino" class="form-control" required>

      <option :value="dato" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato}}
      </option>

      </select>
    </div>
    <div class="form-group col-md-3">
      <strong><label for="departureDue">Tiempo de salida</label></strong>

        <input  v-model="adding.departureDue" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
  
    </div>
    <div class="form-group col-md-3">
      <strong><label for="arrivalDue">Tiempo de LLegada</label></strong>

        <input v-model="adding.arrivalDue" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
  
    </div>
  </div>
    <div class="form-row">

    <div class="form-group col-md-4">
      <strong><label for="inputState">Unidad</label></strong>
      <select v-model="adding.tracker" class="form-control" required>

      <option :value="dato"  v-for=" (dato, index) in datos.trackers" :key="index">
        {{dato.label}}
      </option>

      </select>
    </div>
        <div class="form-group col-md-8">
      <strong><label for="inputName">Comentario</label></strong>
      <input v-model="adding.description" type="text" class="form-control" id="inputName" required>
    </div>

  </div>


  <div class="text-center mb-5">
  <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>
    </div>
</div>

</template>
<script setup>

  import { ref } from 'vue';
  import NavHeader from './NavHeader.vue';

  import { add_trayecto } from './DataConector.js'; //combo  route_Ways,osrm,



let datos=ref({ 
    trackers:[ {id: 1, label: 'N/A'}], 
    poi:[]
})

let saved=ref({
  message:"No Se guardaron los Datos",
  succed:false
})

let id_client=ref(0)

if (window.$cookies.isKey('authorized')){

  id_client.value= window.$cookies.get('authorized').data.id_client
  datos.value.trackers=window.$cookies.get('authorized').tracker

 datos.value.poi=[]
  window.$cookies.get('authorized').poi.forEach(elemPoi=>{

    datos.value.poi.push(elemPoi)

  })



 
}


let adding=ref({

  name:null,
  id_client:id_client.value,
  departureDue:"2023-06-12T19:30",
  arrivalDue:"2023-06-12T19:30",
  tracker:null,
  start:null,
  end:null,
  description:null,
  important:false

})



/*function cleanAdding(){
  adding.value={
  name:null,
  tracker:null,
  start:null,
  end:null,
  description:null,
  important:false
}

}*/

function enviar(){

  add_trayecto(adding.value).then(result=>{

  //cleanAdding()

    if(result){

    saved.value.succed=result
    saved.value.message="Guardado Correctamente"

    setTimeout(()=>{
      window.location.replace("./");
    },2000)

    }else{
      saved.value.succed=true
      saved.value.message="No se Guardaron los Datos"

    setTimeout(()=>{
      saved.value.succed=false
    },3000)

    }      

  })
}


</script>

<style scoped>
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