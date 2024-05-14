import {
    get_trayectos,
    ocultar_trayecto,
    tracker_state
} from './DataConector.js'; //
//import { data } from './DataConector.js'; //combo  route_Ways,osrm,
export async function get_trips(client) {
    let data
    await get_trayectos(client).then(response => {
        let output = []
        response.forEach(item_trayecto => {
            let out = {
                actualTime: null,
                actual_Location:{lat: 0, lng: 0}
            }
            tracker_state(window.$cookies.get('authorized').data.hash, item_trayecto.tracker_id).then(resulState => {
                try {
                    if (resulState.success) {
                        out.actualTime = resulState.state.gps.updated
                        out.actual_Location = resulState.state.gps.location

                       // console.log(resulState)
                    }
                } catch (err) {
                    console.log(err)
                }
                output.push({
                    id: item_trayecto.id,
                    tracker_id: item_trayecto.tracker_id,
                    client_id: item_trayecto.client_id,
                    name: item_trayecto.name,
                    start_label: item_trayecto.start_label,
                    start_coor: item_trayecto.start_coor,
                    end_label: item_trayecto.end_label,
                    end_coor: item_trayecto.end_coor,
                    description: item_trayecto.description,
                    actualTime: out.actualTime,
                    actual_Location:out.actual_Location,
                    //  eta: eta_osrm.routes,
                    //  etaRestante:actual_eta_osrm.routes,
                    porcentaje: 20,
                    important: item_trayecto.important,
                    active: item_trayecto.active
                })
            })
        })
        console.log(output)
        data = output;
    }).catch(error => {
        console.log(error)
    });
    return data
}
export async function hide_trip(id) {
    let data
    await ocultar_trayecto(id).then(response => {
        data = response;
    }).catch(error => {
        console.log(error)
    });
    return data
}