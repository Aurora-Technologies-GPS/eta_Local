import axios from 'axios';

/*const ip='kolarealb.dev2.rastreo.gs';
const protocol='https';
const apiURl=`${protocol}://${ip}/`;
 
const apiURl2='https://api.dev2.rastreo.gs/'*/


const ip = '10.0.0.28:9090';
const protocol = 'http';
const apiURl = `${protocol}://${ip}/`;

const apiURl2='http://localhost:8080/'



export async function auth(datosUser){

   let data;
 await axios.post(apiURl+'single_auth/',datosUser).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}

export async function dispositivos(hash){
    
    let params={hash:hash}

   let data;
 await axios.post(apiURl2+'dispositivos/',params).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}

export async function poi(hash){
    
    let params={hash:hash}

   let data;
 await axios.post(apiURl2+'poi/',params).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}

export async function tracker_state(hash, tracker_id) {

    let data

    const params = { hash:hash, tracker_id: tracker_id}

    await axios.post(apiURl2 + 'trackerState', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}




 export async function get_trayectos(client) {

    let data

    await axios.get(apiURl + 'eta/get_trayectos/'+client.value).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}

 export async function ocultar_trayecto(id) {

        let data

    const params = {
        id:id
    }

    await axios.post(apiURl + 'eta/ocultar_trayecto/',params ).then(response => {
        
       data = response.data;


    }).catch(error => {
        console.log(error)

    });
        return data


}

 export async function add_trayecto(trayecto) {

    const params = {        
        tracker_id:trayecto.tracker.id,
        tracker_label:trayecto.tracker.label,
        client_id:trayecto.id_client,
        name:trayecto.name,
        start_label:trayecto.start.label,
        start_coor:`${trayecto.start.coor.lng},${trayecto.start.coor.lat}`,
        end_label:trayecto.end.label,
        end_coor:`${trayecto.end.coor.lng},${trayecto.end.coor.lat}`,
        description:trayecto.description,
        important:trayecto.important
    }

    let data

    await axios.post(apiURl + 'eta/add_trayecto',params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}

 export async function completar_trayecto(id) {

    let data

    const params = {        
        id:id
    }

    await axios.post(apiURl + 'eta/completar_trayecto/', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}



export async function osrm(origen, destino) {

    let data

    const params = { origen: origen, destino: destino }

    await axios.post(apiURl + 'eta/osrm', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}












