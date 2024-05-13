
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
      <strong><label for="inputInicio">ORIGEN</label></strong>
      <select v-model="adding.start" id="inputInicio" class="form-control" required>

      <option :value="dato" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato.label}}
      </option>

      </select>
    </div>
    <div class="form-group col-md-6">
      <strong><label for="inputDestino">DESTINO</label></strong>
      <select v-model="adding.end" id="inputDestino" class="form-control" required>

      <option :value="dato" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato.label}}
      </option>

      </select>
    </div>
  </div>
    <div class="form-row">
    <div class="form-group col-md-6">
      <strong><label for="inputName">Nombre</label></strong>
      <input v-model="adding.name" type="text" class="form-control" id="inputName" required>
    </div>
    <div class="form-group col-md-4">
      <strong><label for="inputState">Unidad</label></strong>
      <select v-model="adding.tracker" class="form-control" required>

      <option :value="dato"  v-for=" (dato, index) in datos.trackers" :key="index">
        {{dato.label}}
      </option>

      </select>
    </div>
    <div class="form-group col-md-2">
      <strong><label for="inputcomment">Comment</label></strong>
      <input type="text" class="form-control" id="inputcomment">
    </div>
  </div>
  <div class="form-group">
    <strong><label for="inputAddress">Description</label></strong>
    <input v-model="adding.description" type="text" class="form-control" id="inputAddress" placeholder="Description del Trayecto (Opcional)">
  </div>

  <div class="form-group">
    <div class="form-check">
      <input v-model="adding.important" class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Importante
      </label>
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
    poi:[{label: 'N/A', coor: {lat: '0', lng: '0'}}]
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

    datos.value.poi.push({
      label:elemPoi.label,
      coor:elemPoi.location
    })

  })



 
}


let adding=ref({

  name:null,
  id_client:id_client.value,
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