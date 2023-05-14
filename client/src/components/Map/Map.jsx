import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

// fix for missing default icon
import icon from '../../assets/icons/web/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41], // set the size of the icon
    iconAnchor: [12, 41] // set the anchor point to the bottom center of the icon
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ lat, lon, popupText }) {

	const position = [lat, lon];

	return (
		<MapContainer className="map" center={position} zoom={13} >
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={position} icon={DefaultIcon}>
				<Popup isOpen={true}>
					{popupText}
				</Popup>
			</Marker>
		</MapContainer>
	);
}

export default Map;
