import axios from 'axios';

const apiURl = process.env.VUE_APP_ROOT_URL;
const apiURl2 = process.env.VUE_APP_URL;
const api = process.env.VUE_APP_API;



export async function auth(params){

    console.log("el auth de HEctor")


    const headers={
          'Access-Control-Allow-Origin': true,
        }

   let data;
 await axios.post(api+'/auth/',params,{ headers: headers}).then(response=>{
    data=response;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}





export async function dispositivos(hash){
    
    let params={hash:hash}

   let data;
 await axios.post(apiURl2+'/dispositivos/',params).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}


 export async function poi(hash) {

    let data

    console.log('/placeList/'+hash)

    await axios.get(api ).then(response => {
        data = response;

        console.log(data)

    }).catch(error => {
        console.log(error)

    });
    return data

/*        return [
    "MI hogar ",
    "CASA DE de ",
    "AURORA ",
    "IR A BELLA VISTA "
]
*/
}

poi("hola").then(result=>{
    console.log(result)
})

export async function tracker_state(hash, tracker_id) {

    let data

    const params = { hash:hash, tracker_id: tracker_id}

    await axios.post(apiURl2 + '/trackerState', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}




 export async function get_trayectos(client) {

    let data

    await axios.get(apiURl + '/eta/get_trayectos/'+client.value).then(response => {
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

    await axios.post(apiURl + '/eta/ocultar_trayecto/',params ).then(response => {
        
       data = response.data;


    }).catch(error => {
        console.log(error)

    });
        return data


}

 export async function add_trayecto(trayecto) {

    const params = {        
        //tracker_id:trayecto.tracker.id,
       // tracker_label:trayecto.tracker.label,
        clientId:trayecto.id_client,
        userId:0,
        startPlaceId:1,
        departureDue:trayecto.departureDue,
        arrivalDue:trayecto.arrivalDue,
        name:trayecto.name
       // start_label:trayecto.start.label,
      //  start_coor:`${trayecto.start.coor.lng},${trayecto.start.coor.lat}`,
       // end_label:trayecto.end.label,
        //end_coor:`${trayecto.end.coor.lng},${trayecto.end.coor.lat}`,
       // description:trayecto.description,
       // important:trayecto.important
    }

    let data

    await axios.post(api + '/saveShuttle',params).then(response => {
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

    await axios.post(apiURl + '/eta/completar_trayecto/', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}



export async function osrm(origen, destino) {

    let data

    const params = { origen: origen, destino: destino }

    await axios.post(apiURl + '/eta/osrm', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}












