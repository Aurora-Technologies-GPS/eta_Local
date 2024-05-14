<template>
<div>
<!-- login -->
<section class="login">

<div class="contenidoLogin text-center">
  <img  src='../assets/auroraLogo.png' alt="Responsive image" style=" width: 50%;">
<h3 class="Bienvenido">Bienvenido!</h3>


<div  class="searchBar   mt-2 rounded-pill" style="position: relative;">
<i class="bi bi-person-fill"></i>
<input v-model="datosUser.user" class="inputsearchBar"  placeholder="Usuario" type="text">
<i v-if="claveIncorrecta" class="bi bi-exclamation-circle" style="position: absolute; right: 5%; margin: 5px; font-size: larger; color: red;"></i> 
</div>




<br>	
<div  class="searchBar rounded-pill" style="position: relative;">
<i class="bi bi-key-fill"></i>
<input class="inputsearchBar" v-model="datosUser.pass"  placeholder="Contrasena" type="password">
<i v-if="claveIncorrecta" class="bi bi-exclamation-circle" style="position: absolute; right: 5%; margin: 5px; font-size: larger; color: red;"></i> 
</div>	
	
<div @click="consultar()" class="btn btn-primary rounded-pill btAcceder" href="#" role="button"><b>Ingresar</b>
</div>

</div>

</section>	
</div>
</template>

<script setup>
	import {ref} from 'vue'
	import { auth, dispositivos, poi} from './DataConector.js'


let datosUser=ref({user:"", pass:""})

let claveIncorrecta=ref(false)

if (window.$cookies.isKey('authorized')){

  console.log(window.$cookies.get('authorized'))

  window.location.replace("./dashboard");
}


function consultar(){


	auth(datosUser.value).then(result=>{

  try{
    
    if(result.success){
          dispositivos(result.hash).then(resultData=>{
            if(resultData.success){

            let output={data:null, tracker:[], poi:[]}

            resultData.list.forEach(elemTracker=>{
              output.tracker.push({ id:elemTracker.id, label:elemTracker.label})
            })

            poi(result.hash).then(resul_places=>{              

            if(resul_places){            

            console.log("Bienvenido")

            resul_places.list.forEach(elemPois=>{
              output.poi.push(elemPois)
            })

            output.data=result

            console.log(output)


            window.$cookies.set('authorized',output) 
           // window.$cookies.get('authorized')
            window.location.replace("./dashboard");
            }else{
              console.log("ocuurio un error al cargar places")
            }

            })



            }else{
              console.log("error al buscar Trackers")
            }

    }).catch(error=>{
      console.log(error)
    })

    }
    else{
        claveIncorrecta.value=true
      }

    
  }
  catch(error){
    console.log(error)
  }

		
	})
	
}

</script>

<!-- <script setup>
  


if (window.$cookies.isKey('auth_popular')){
  datosUser.value.user=window.$cookies.get('auth_popular').user
  datosUser.value.pass=window.$cookies.get('auth_popular').pass
  datosUser.value.autenticado=window.$cookies.get('auth_popular').autenticado

  console.log(datosUser.value.autenticado)
}




function consultar(){

if (!window.$cookies.isKey('auth_popular')) {

if ((datosUser.value.user !=null) && (datosUser.value.user !=null) ) {

  auth(datosUser.value).then(result=>{

    if(result.success){
    datosUser.value.autenticado=true;
    datosUser.value.id=result.id
    datosUser.value.id_client=result.id_client
    datosUser.value.id_pannel=result.id_pannel
    datosUser.value.userName=result.name
    datosUser.value.domain=result.domain
    datosUser.value.key=result.key
    datosUser.value.legal_name=result.legal_name

   window.$cookies.set('auth_popular', datosUser.value)


}else{
    authInternal({ username: datosUser.value.user, pass:datosUser.value.pass}).then(resultUsers=>{

      if(resultUsers){
        if(resultUsers.length>0){

          console.log(resultUsers[0])

              datosUser.value.autenticado=true;
              datosUser.value.id=resultUsers[0].id
              datosUser.value.id_client=resultUsers[0].client_id
              datosUser.value.id_pannel=21
              datosUser.value.userName=resultUsers[0].first_name
              datosUser.value.domain="Aurora.com.do"
              datosUser.value.key="1234567"
              datosUser.value.legal_name="Popular"
              window.$cookies.set('auth_popular', datosUser.value)

        }
          claveIncorrecta.value=true
       

      }else{
        claveIncorrecta.value=true
      }
    })
  
}
}).catch(error => {console.log(error)});

  }else{
    console.log('favor llene los campos')
    claveIncorrecta.value=true
      return null
  }

} 
}



/*fin dasboard*/

</script> -->

<style scoped>
/* para el login*/

.Bienvenido{
  color:#4abed5;
  font-size: calc(1em + 1vw);
  padding-bottom: 20px;
}

.inputsearchBar{
padding:10px;
width: 80%;

outline: none !important;
border: none;

}

.searchBar{
  /*width: 400px;*/
  margin-left: 21%;
  margin-right: 21%;
  background-color: white;
  border: none;
  color: #00ab5f;
}

.btAcceder{
  background-color: #ffffff;
  color: #003466;
  width: 230px;
   border: none;
   margin-top: 20px;
   margin-bottom:20px;
}


.login {
  /*background-image: url("../assets/fondoazul.png");*/
  height: 100vh;
  /*min-width: 1000px;*/
  background-color: #366fce;
 background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.contenidoLogin{
  position: absolute;
  width: auto;
  padding: 15px;
  height: auto;
  min-width: 600px;
  background-color: rgba(0, 0, 0, 0.0);;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
/*  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;*/
  
}

.pagina{
background-color: #cbcbcb;
min-height: 100vh;
font-family: 'Poppins', sans-serif;
}






</style>