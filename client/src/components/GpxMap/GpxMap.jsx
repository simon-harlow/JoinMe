import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../Utils/const';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./GpxMap.scss";

// fix for missing icon
import greenIcon from '../../assets/icons/web/marker-icon-green.png';
import redIcon from '../../assets/icons/web/marker-icon-red.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: greenIcon,
    shadowUrl: iconShadow,
    iconSize: [25, 41], // set the size of the icon
    iconAnchor: [12, 41] // set the anchor point to the bottom center of the icon
});

let EndIcon = L.icon({
    iconUrl: redIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
})

L.Marker.prototype.options.icon = DefaultIcon;

function GpxMap( {event} ) {

    const [gpxData, setGpxData] = useState("");

    useEffect(() => {
		axios
			.get(`${API_URL}/events/${event.id}/gpx/${event.gpx_url}`)
			.then((response) => {
				setGpxData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

    console.log("gpxData",gpxData)
    const positions = gpxData && gpxData.map(p => [p.lat, p.lon]);
    console.log("positions",positions);

    return (
		<>
			{positions.length > 0 &&
			<MapContainer className="gpx_map" center={positions[0]} zoom={11}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Polyline pathOptions={{ fillColor: 'red', color: 'blue' }} positions={positions} />
                <Marker position={positions[0]} icon={DefaultIcon}>
                    <Popup>{event.start_location}</Popup>
                </Marker>
                <Marker position={positions[positions.length-1]} icon={EndIcon}>
                    <Popup>{event.end_location}</Popup>
                </Marker>
			</MapContainer>
			}
		</>
	);
}

export default GpxMap