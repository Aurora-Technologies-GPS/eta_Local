import axios from 'axios';

const ip2='10.0.0.28:4000';
const protocol2='https';
const apiURl2=`${protocol2}://${ip2}/`;


export async function authInternal(datosUser){

   let data;
 await axios.post(apiURl2+'internal/',datosUser).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}



export async function auth(datosUser){

   let data;
 await axios.post(apiURl2+'auth/',datosUser).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}







/* const ip='kolarealb.dev2.rastreo.gs';
 const protocol='https';
 const apiURl=`${protocol}://${ip}/`;*/


 const ip = '10.0.0.28:4000';
 const protocol = 'http';
 const apiURl = `${protocol}://${ip}/`;

/*

export async function combo(pdi) {

    let data

    const params = { pdi: pdi }

    await axios.post(apiURl + 'eta/comb', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}
export async function tracker_state(tracker_id) {

    let data

    const params = { tracker_id: tracker_id }

    await axios.post(apiURl + 'eta/tracker_state', params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}
export async function route_Ways(tracker_id, from, to) {

    let data

    const params = { tracker_id: tracker_id, from: from, to: to }

    await axios.post(apiURl + 'eta/route_Ways', params).then(response => {
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

*/
 export async function get_trayectos(client) {

    let data

    await axios.get(apiURl + 'get_trayectos/'+client.value).then(response => {
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

    await axios.post(apiURl + 'ocultar_trayecto/',params ).then(response => {
        
       data = response.data;


    }).catch(error => {
        console.log(error)

    });
        return data


}

 export async function add_trayecto(trayecto) {

    console.log(trayecto)

    const params = {        
        tracker_id:4321,
        client_id:trayecto.id_client,
        name:trayecto.name,
        start_label:trayecto.start.title,
        start_coor:`${trayecto.start.coor.lat},${trayecto.start.coor.lng}`,
        end_label:trayecto.end.title,
        end_coor:`${trayecto.end.coor.lat},${trayecto.end.coor.lng}`,
        description:trayecto.description,
        important:trayecto.important
    }

    let data

    await axios.post(apiURl + 'add_trayecto',params).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}


 export async function data(client) {

    let data

    await axios.get(apiURl + 'datos/'+client.value).then(response => {
        data = response.data;

    }).catch(error => {
        console.log(error)

    });
    return data

}













