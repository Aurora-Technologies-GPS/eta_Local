import { get_trayectos, ocultar_trayecto, tracker_state, osrm } from './DataConector.js'; //

//import { data } from './DataConector.js'; //combo  route_Ways,osrm,
export async function get_trips(client) {
    let data
    await get_trayectos(client).then(response => {
        let output = []
        let porcentaje = 0
        response.forEach(item_trayecto => {
            let out = {
                actualTime: '2000-01-15 10:10:52',
                actual_Location: {
                    lat: 18.8806083,
                    lng: -70.3670433
                },
                actual_Location_osrm: '-70.3583633,18.86777',
                eta_total: {
                    routes: [{
                        distance: 0,
                        duration: 0
                    }]
                },
                eta_rest: {
                    routes: [{
                        distance: 0,
                        duration: 0
                    }]
                }
            }
            tracker_state(window.$cookies.get('authorized').data.hash, item_trayecto.tracker_id).then(resulState => {
                try {
                    if (resulState.success) {
                        out.actualTime = resulState.state.gps.updated
                        out.actual_Location = resulState.state.gps.location
                        out.actual_Location_osrm = resulState.state.gps.location.lng + "," + resulState.state.gps.location.lat
                        // console.log(resulState)
                    }
                } catch (err) {
                    console.log(err)
                }
                osrm(item_trayecto.start_coor, item_trayecto.end_coor).then(osrm_total => {
                    if (osrm_total.code == 'Ok') {
                        out.eta_total = osrm_total.routes
                    }
                    osrm(out.actual_Location_osrm, item_trayecto.end_coor).then(osrm_res => {
                        try {
                            if (osrm_res.code == 'Ok') {
                                out.eta_rest = osrm_res.routes
                                let porc = (((out.eta_total[0].distance - out.eta_rest[0].distance) * 100) / out.eta_total[0].distance).toFixed(2) || 0

                                porcentaje = porc
                            }
                        } catch (error) {
                            console.log(error)
                        }

                        console.log({
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
                            actual_Location: out.actual_Location,
                            actual_Location_osrm: out.actual_Location_osrm,
                            eta: out.eta_total,
                            etaRestante: out.eta_rest,
                            porcentaje: porcentaje,
                            important: item_trayecto.important,
                            complete:item_trayecto.complete,
                            active: item_trayecto.active
                        })
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
                            actual_Location: out.actual_Location,
                            actual_Location_osrm: out.actual_Location_osrm,
                            eta: out.eta_total,
                            etaRestante: out.eta_rest,
                            porcentaje: porcentaje,
                            important: item_trayecto.important,
                            complete:item_trayecto.complete,
                            active: item_trayecto.active
                        })
                    })
                })
            })
        })
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