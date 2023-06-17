import { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ActivityIcon from "../Utils/activityIcons";
import "./EventsMap.scss";

// fix for missing default icon
import icon from "../../assets/icons/web/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function EventsMap({ events, handleClickEvent }) {

    const positions = events.map((event) => [
        event.start_lat,
        event.start_lon,
    ]);

    const bounds = L.latLngBounds(positions);

	if (!events) {
		return null;
	}

	return (
		<MapContainer className="events-map" bounds={bounds}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{events.map((event) => (
				<Marker
					key={event.id}
                    icon={DefaultIcon}
					position={[event.start_lat, event.start_lon]}
				>
					<Popup>
						<div className="popup" onClick={() => handleClickEvent(event.id)}>
                            <div className="popup-header">
                                <ActivityIcon activityType={event.activity_type} />
                                <div>
                                    <h3 className="popup-header__title">{event.title}</h3>
                                </div>
                            </div>
                            <div>
                                <p className="popup-desc">{event.description}</p>
                            </div>
                            <div className="popup-details">
                                <div className="popup-details__field">
                                    <h6 className="popup-details__label">Date & Time:</h6>
                                    <p className="popup-details__text">{new Date(event.event_time).toLocaleString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</p>
                                </div>
                                <div className="popup-details__field">
                                    <h6 className="popup-details__label">Start Location:</h6>
                                    <p className="popup-details__text">{event.start_location}</p>
                                </div>
                            </div>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}

export default EventsMap;
