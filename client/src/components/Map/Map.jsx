import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

// fix for missing default icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// if lat, lon and popupText not passed as props then default to Vancouver
function Map({ lat, lon, popupText }) {
	console.log(lat, lon, popupText);
	const position = [lat, lon];

	return (
		<MapContainer className="map" center={position} zoom={13} >
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={position}>
				<Popup isOpen={true}>
					{popupText}
				</Popup>
			</Marker>
		</MapContainer>
	);
}

export default Map;
